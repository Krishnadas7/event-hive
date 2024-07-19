/* eslint-disable @typescript-eslint/no-explicit-any */
import axios,{AxiosInstance} from 'axios'


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
        const res = await companyApi.post('/login',{company_email,password},{
            withCredentials:true
        })
        return res
    } catch (error) {
        console.log(error);
        
    }
  }

export const sendEmail = async (values:any)=>{
    try {
        const res = await companyApi.post('/send-email',values)
    return res
    } catch (error) {
        console.log(error);
        
    }
    
}
export const companyRegister = async (otp:string) =>{
    try {
        console.log('company apiii')
        const res = await companyApi.post('/signup',{otp})
        console.log('res from registe api',res)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const getCompanyProfileData = async () =>{
  try {
    const res = await companyApi.get('/get-company-profile',{withCredentials:true})
    return res
  } catch (error) {
    console.log(error)
  }
 
} 
export const companyProfileEdit = async (formData:any) =>{
  try {
    console.log('values from apii')
    console.log('form data fromapi',formData);
    
      const res = await companyApi.post('/company-profile-edit',formData,{headers: {
        'Content-Type': 'multipart/form-data'}})
      return res
  } catch (error) {
    console.log(error)
  }
}
export const createEvent = async (formData:any) =>{
  try {
    const res = await companyApi.post('/event-creation',formData,{headers: {
      'Content-Type': 'multipart/form-data'}})
      return res
  } catch (error) {
    console.log(error)
  }
}
export const getEvent = async (companyId:string) =>{
  try {
    const res = await companyApi.get(`/get-all-event?companyId=${companyId}`)
    return res
  } catch (error) {
    console.log(error);
    
  }
}
export const liveEvents = async (companyId:string) =>{
  try {
     const res = await companyApi.get(`/live-events?companyId=${companyId}`)
     return res
  } catch (error) {
    console.log(error)
  }
}
export const allMembers = async (eventId:string) =>{
  try {
    const res = await companyApi.get('/all-members',{
      params:{
        eventId:eventId
      }
    })
    return res
  } catch (error) {
    console.log(error);
    
  }
}
export const closeEvent = async (eventId:string) =>{
  try {
    const res = await companyApi.post('/close-event',{eventId:eventId})
    return res
  } catch (error) {
    console.log(error);
    
  }
}
export const sendNotification = async (eventId:string,url:string) =>{
  try {
    const res = await companyApi.post('/send-bulk-email',{eventId:eventId,url:url})
    return res
  } catch (error) {
    console.log(error)
  }
}



