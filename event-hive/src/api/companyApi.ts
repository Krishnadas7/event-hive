import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'
import { CompanyData } from '../components/company/CompanyHomepage/ProfileDetails';

const companyApi : AxiosInstance = axios.create({
    baseURL:'http://localhost:3003/api/company'
})

companyApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('companyAccessToken');
    // console.log('acess from request interceptors',accessToken);
    
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
            const response = await companyApi.post("http://localhost:3003/api/company/refresh-token", {
              refreshToken
            },{withCredentials:true});
            console.log('ress from refre',response);
            
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
//   export const getUser = async () =>{
//      try {
//       console.log('getusre jkbbk');
      
//         const res = await adminApi.get('/get-user',{withCredentials:true})
//         console.log('res fro adapter',res)
//         return res
//      } catch (error) {
//       console.log(error);
      
//      }
//   }
//   export const blockUnblock = async (_id:string) =>{
//     try {
//       console.log('admin apiiii');
      
//       const res = await adminApi.patch(`/user/block-unblock?_id=${_id}`)
//       return res
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
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
    const res = await companyApi.get(`/get-all-company?companyId=${companyId}`)
    return res
  } catch (error) {
    console.log(error);
    
  }
}

