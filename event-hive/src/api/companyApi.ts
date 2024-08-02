import axios,{AxiosInstance} from 'axios'
import { AxiosResponse } from 'axios'
import { ICompany } from '../types/schema'
import { EventData } from '../components/company/CompanyHomepage/EventModal'

interface Error {
  response?: {
      data?: {
          message: string,
      }
  }
}

const COMPANY_API = process.env.COMPANY_API
const COMPANY_REFRESH_API = process.env.COMPANY_REFRESH_API

const companyApi : AxiosInstance = axios.create({
    baseURL:COMPANY_API
})

companyApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('companyAccessToken');    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
  );

  companyApi.interceptors.response.use(
    (response) => {
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('companyRefreshToken')
        
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            const response = await companyApi.post(COMPANY_REFRESH_API as string, {
              refreshToken
            },{withCredentials:true});
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('companyAccessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return companyApi(originalRequest)
          } catch (err) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
);


  export const cLogin = async ({company_email,password}:
    {
      company_email:string;
    password:string;
  }) =>{
    try {
        const res :AxiosResponse = await companyApi.post('/login',{company_email,password},{
            withCredentials:true
        })
        return res.data
    } catch (error) {
      return (error as Error).response?.data;
        
    }
  }

export const sendEmail = async (values:ICompany)=>{
    try {
        const res :AxiosResponse = await companyApi.post('/send-email',values)
    return res.data
    } catch (error) {
      return (error as Error).response?.data;
        
    }
    
}
export const companyRegister = async (otp:string) =>{
    try {
        const res :AxiosResponse = await companyApi.post('/signup',{otp})
        return res.data
    } catch (error) {
      return (error as Error).response?.data;
    }
}
export const getCompanyProfileData = async () =>{
  try {
    const res:AxiosResponse = await companyApi.get('/get-company-profile',{withCredentials:true})
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
 
} 
export const companyProfileEdit = async (formData:ICompany) =>{
  try {
      const res:AxiosResponse = await companyApi.post('/company-profile-edit',formData,{headers: {
        'Content-Type': 'multipart/form-data'}})
      return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}
export const createEvent = async (formData:EventData) =>{
  try {
    const res:AxiosResponse = await companyApi.post('/event-creation',formData,{headers: {
      'Content-Type': 'multipart/form-data'}})
      return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}
export const getEvent = async (companyId:string) =>{
  try {
    const res:AxiosResponse = await companyApi.get(`/get-all-event?companyId=${companyId}`)
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
    
  }
}
export const liveEvents = async (companyId:string) =>{
  try {
     const res:AxiosResponse = await companyApi.get(`/live-events?companyId=${companyId}`)
     return res.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}
export const allMembers = async (eventId:string) =>{
  try {
    const res:AxiosResponse = await companyApi.get('/all-members',{
      params:{
        eventId:eventId
      }
    })
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
    
  }
}
export const closeEvent = async (eventId:string) =>{
  try {
    const res:AxiosResponse = await companyApi.post('/close-event',{eventId:eventId})
    return res.data
  } catch (error) {
    return (error as Error).response?.data;
    
  }
}
export const sendNotification = async (eventId:string,url:string) =>{
  try {
    const res = await companyApi.post('/send-bulk-email',{eventId:eventId,url:url})
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}



