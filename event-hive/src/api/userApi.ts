// import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'
// import { IUser } from '../types/schema'

// const userApi : AxiosInstance = axios.create({
//     baseURL:'http://localhost:3003/api/user'
// })

// userApi.interceptors.request.use(
//     (config: any) => {
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )
// userApi.interceptors.response.use(
//     (response: AxiosResponse) => {
//       // Do something with successful response data
//       return response;
//     },
//     (error) => {
//       // Do something with response error
//       return Promise.reject(error);
//     }
//   );

//   export const signUp = async ({first_name,last_name,email,mobile,password,confirm_password}:IUser) =>{
//     try {
//       if(password!=confirm_password){
//         alert('password and confirm password not match')
//       }
//       const res =await userApi.post('/signup',{first_name,last_name,email,mobile,password,confirm_password},{
//         withCredentials:true
//       })
      
//       console.log(res.data.token)
//       return res
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
//   export const login = async ({email,password}:{
//     email:string;
//     password:string;
//   }) =>{
//     try {
//       const res = await userApi.post('/login',{email,password},{
//         withCredentials:true
//       })
//       return res
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IUser } from '../types/schema';
import { MyError } from '../validations/validationTypes';
import { string } from 'yup';

export const userApi: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003/api/user'
});

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
        console.log('dsklklds',originalRequest);
        console.log('sdklsdjkljds',error.response.status);
        
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
           console.log('sdkljdskljdsklsd=');
           
          originalRequest._retry = true;
          try {
            const response = await userApi.post("http://localhost:3003/api/user/refresh-token", {
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
        if (password !== confirm_password) {
            alert('password and confirm password not match');
        }
        const res = await userApi.post('/signup', { first_name, last_name, email, mobile, password, confirm_password }, {
            withCredentials: true
        });

        console.log(res.data.token);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const login = async ({ email, password }: { email: string; password: string; }) => {
    
        const res = await userApi.post('/login', { email, password }, {
            withCredentials: true
        });
          
        // Store tokens securely
        localStorage.setItem('userAccessToken', res.data.userAccessToken);
        localStorage.setItem('userRefreshToken', res.data.userRefreshToken);
        return res;
   
};
export const getProfile = async ()=>{
  try {
   
    
    const res = await userApi.get('/profile');
      console.log('from userprofile frontend',res);
      
    return res
  } catch (error) {
    
  }
}
export const sendOtpToEmail = async ({first_name,email}:{first_name:string,email:string}) =>{
  try {
    const res = await userApi.post('/sendEmail',{
      first_name,email
    },{withCredentials:true})
    return res
  } catch (error) {
    
  }
}
export const otpVerification = async ({otp,email}:{otp:string,email:string}) =>{
  try {
    console.log('otpp',otp);
    
    const res = await userApi.post('/verifyEmail',{otp,email},{withCredentials:true})
    console.log('resss ',res)
    return res
  } catch (error) {
    
  }
}
export const googleAuth = async ({name,email,password}:{name:string,email:string,password:string}) =>{
  let first_name=name
  try {
    const res = await userApi.post('/oauth',{first_name,email,password},{withCredentials:true})
    return res
  } catch (error) {
    console.log(error);
    
  }
}
export const profileImageUpload = async (formData :any) =>{
  try {
    console.log('data from usreprofile update',formData)
    const res =await userApi.post('/profile-image-update',formData,{headers: {
      'Content-Type': 'multipart/form-data',
    }})
    console.log('response from imagecrop==',res.data.data);
    
    return res
  
  } catch (error) {
    console.log(error);
    
  }
}
export const getImage = async (email:string) =>{
  try {
    const res = await userApi.get(`/get-image?email=${email}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
export const forgotPassword = async ({name,email}:{name:string,email:string}) =>{
  try {
    const res = userApi.post('/sendemailfor-forgot',{name,email},{withCredentials:true})
    return res
  } catch (error) {
    console.log(error)
  }
}
export const resetPassword = async ({password,forgotToken}:{password:string,forgotToken:string}) =>{
   try {
    console.log('itemssss  ',password,forgotToken)
    const res = userApi.post('/reset-password',{password,forgotToken},{withCredentials:true})
    return res
   } catch (error) {
    console.log('reset password error')
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
    console.log(first_name,last_name,qualification,bio,socialmedialink1,socialmedialink2)
     const res = await userApi.post('/profile-update',{
      first_name,
      last_name,
      bio,
      qualification,
      socialmedialink1,
      socialmedialink2
     },{withCredentials:true})
     return res
  }
  export const userData = async (email:string) =>{
    try {
      const res = await userApi.get(`/user-data?email=${email}`,{withCredentials:true})
      console.log('res from userdata',res);
      
      return res
    } catch (error) {
      console.log(error); 
    }
  }
  export const getRandomUser = async (userId:string) =>{
    try{
      const res = await userApi.get(`/random-user-data?userId=${userId}`,{withCredentials:true})
      console.log('res from userdata',res);
      
      return res
    }catch(error){
      console.log(error)
    }
  }
  export const allUsers = async () =>{
    try {
      const res = await userApi.get('/all-user')
      return res
    } catch (error) {
     console.log(error);
     
    }
  }
  export const eventForUser = async () =>{
    try{
      const res = await userApi.get('/event-for-users')
      return res
    }catch(error){
      console.log(error);
      
    }
  }
  export const selectedEvent = async (eventId:string) =>{
    try {
      console.log('idddd',eventId)
      const res = await userApi.get(`/selected-event?eventId=${eventId}`)
      console.log('sdfdsfds',res)
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  // export const getConversation = async () =>{
  //   try {
  //     const res = await userApi.get('/conversation',{withCredentials:true})
  //     return res
  //   } catch (error) {
  //     console.log(error); 
  //   }
   

  // }

export default userApi;

  