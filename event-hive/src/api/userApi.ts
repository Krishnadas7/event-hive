import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IUser } from '../types/schema';
import { Booking } from '../validations/validationTypes';
import { Obj } from '../types/schema';
import { store } from '../app/store';
import { userLogOut } from '../slices/authSlice';
const USER_API = process.env.USER_API
// import { userLogOut } from '../slices/authSlice';
console.log(process.env.USER_API,process.env.ADMIN_API)
const USER_REFRESH_API = process.env.USER_REFRESH_API
export const userApi: AxiosInstance = axios.create({
    baseURL: USER_API
});

interface Error {
  response?: {
      data?: {
          message: string,
      }
  }
}


userApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('userAccessToken');
        console.log('acess from request interceptors',accessToken);
        
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          
        }
        return config;
      },
      (error) => {
        
        return Promise.reject(error);
      }
);

// Response interceptor
userApi.interceptors.response.use(
    (response) => {
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('userRefreshToken')
        
        if(error?.response.status === 403){
          store.dispatch(userLogOut())
      
        }

        if (error?.response.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            const response = await userApi.post(USER_REFRESH_API as string, {
              refreshToken
            },{withCredentials:true});
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('userAccessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return userApi(originalRequest)
          } catch (err) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
);


export const signUp = async ({ first_name, last_name, email, mobile, password, confirm_password }: IUser) => {
    try {
       
        const res:AxiosResponse = await userApi.post('/signup', { first_name, last_name, email, mobile, password, confirm_password }, {
            withCredentials: true
        });

        return res?.data;
    } catch (error) {
      return (error as Error).response?.data;
    }
};

export const login = async ({ email, password }: { email: string; password: string; }) => {
        try {
           const res:AxiosResponse = await userApi.post('/login', { email, password }, {
            withCredentials: true
        });
        
        return res?.data;
      } catch (error) {
        return (error as Error).response?.data;
    }
};

export const sendOtpToEmail = async (first_name:string,email:string) =>{
  try {
    const res = await userApi.post('/sendEmail',{
      first_name,email
    },{withCredentials:true})
    
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
    
  }
}
export const otpVerification = async ({otp,email}:{otp:string,email:string}) =>{
  try {
    const res = await userApi.post('/verifyEmail',{otp,email},{withCredentials:true})
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}

export const googleAuth = async ({name,email,password}:{name:string,email:string,password:string}) =>{
  const first_name=name
  try {
    const res = await userApi.post('/oauth',{first_name,email,password},{withCredentials:true})
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
    
  }
}
export const profileImageUpload = async (formData:FormData) =>{
  try {
    console.log('data from usreprofile update',formData)
    const res:AxiosResponse = await userApi.post('/profile-image-update',formData,{headers: {
      'Content-Type': 'multipart/form-data',
    }})
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
    
  }
}
export const getImage = async (email:string) =>{
  try {
    const res:AxiosResponse = await userApi.get(`/get-image?email=${email}`)
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}
export const forgotPassword = async ({name,email}:{name:string,email:string}) =>{
  try {
    const res:AxiosResponse =await userApi.post('/sendemailfor-forgot',{name,email},{withCredentials:true})
    return res?.data
  } catch (error) {
    return (error as Error).response?.data;
  }
}
export const resetPassword = async ({password,forgotToken}:{password:string,forgotToken:string}) =>{
   try {
    console.log('itemssss  ',password,forgotToken)
    const res:AxiosResponse = await userApi.post('/reset-password',{password,forgotToken},{withCredentials:true})
    return res?.data
   } catch (error) {
    return (error as Error).response?.data;
   }
}
export const updateProfile = async ({
  first_name,
  last_name,
  qualification,
  bio,
  socialmedialink1,
  socialmedialink2}:{
    first_name:string,
    last_name:string,
    bio:string,
    qualification:string,
    socialmedialink1:string,
    socialmedialink2:string
  }) =>{
    try {
      console.log(first_name,last_name,qualification,bio,socialmedialink1,socialmedialink2)
      const res:AxiosResponse = await userApi.post('/profile-update',{
       first_name,
       last_name,
       bio,
       qualification,
       socialmedialink1,
       socialmedialink2
      },{withCredentials:true})
       console.log('res dataa from eidt profile',res)
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
   
  }
  export const userData = async (email:string) =>{
    try {
      const res:AxiosResponse = await userApi.get(`/user-data?email=${email}`,{withCredentials:true})
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }
  export const getRandomUser = async (userId:string) =>{
    try{
      const res:AxiosResponse = await userApi.get(`/random-user-data?userId=${userId}`,{withCredentials:true})
      console.log('res from userdata',res);
      
      return res?.data
    }catch(error){
      return (error as Error).response?.data;
    }
  }
  export const allUsers = async () =>{
    try {
      const res:AxiosResponse = await userApi.get('/all-user')
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
     
    }
  }
  export const eventForUser = async (pagination:number) =>{
    try{
      
      const res:AxiosResponse = await userApi.get('/event-for-users',{
        params: { pagination: pagination },
      })
      return res?.data
    }catch(error){
      return (error as Error).response?.data;
      
    }
  }
  export const selectedEvent = async (eventId:string) =>{
    try {
      const res = await userApi.get(`/selected-event?eventId=${eventId}`)
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }

  export const filterEvent= async ({type,ticket,date}:{type:string,ticket:string,date:string}) =>{
    console.log(type,ticket,date)
    try {
      const res:AxiosResponse = await userApi.get('/filter-events',{
        params:{type:type,
          ticket:ticket,
          date:date
        }
      })
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }
  export const ticketBooking = async (obj:Booking) =>{
    try {
      const res:AxiosResponse = await userApi.post('/ticket-booking',obj)
      return res.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }
  export const allBookings = async (userId : string) =>{
     try {
      const res:AxiosResponse = await userApi.get('/all-bookings',{
        params:{userId:userId}
      })
      return res?.data
     } catch (error) {
      return (error as Error).response?.data;
     }
  }
  export const membersExist = async (userId:string,email :string) =>{
    try {
      const res = userApi.get('/member-exist',{
        params:{
          userId:userId,
          email:email
        }
      })
      return res
    } catch (error) {
      console.log(error)
    }
  }
  export const liveChecking = async (userId:string) =>{
     try {
        const res:AxiosResponse =await userApi.get('/live-checking',{
          params:{userId:userId}
        })
        console.log(res,'kkk')
        return res?.data
     } catch (error) {
      console.log(error,'kkk')
      return (error as Error).response?.data;
     }
  }
  export const liveListing = async (userId:string) =>{
    try {
      const res:AxiosResponse = await userApi.get('/live-listing',{
        params:{
          userId:userId
        }
      })
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }
  export const getNotification = async () =>{
    try {
      const res = await userApi.get('/user-notification',{
        withCredentials:true
      })
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }
  
  export const landingPageEventCount = async () =>{
    try {
       const res:AxiosResponse = await userApi.get('/landing-page-event-count')
       return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }
  
  export const landingPageLiveEventCount = async () =>{
    try {
      const res:AxiosResponse = await userApi.get('/landing-page-live-event-count')
      return res?.data
    } catch (error) {
      return (error as Error).response?.data;
    }
  }

  export const createReport = async (obj:Obj) =>{
    try{
      const res:AxiosResponse = await userApi.post('/create-report',obj)
      return res?.data
    }catch(error){
      return (error as Error).response?.data;
    }
  }

export default userApi;

  