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


const userApi: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003/api/user'
});

userApi.interceptors.request.use(
    (config) => {
        console.log('userapi request interceptors')
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log('acccccccccc',config.headers.Authorization);
          
        }
        return config;
      },
      (error) => {
        console.log('request error in api');
        
        return Promise.reject(error);
      }
);

// Response interceptor
userApi.interceptors.response.use(
    (response) => {
      console.log('success response');
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await axios.post("/refresh-token", {
              refreshToken: localStorage.getItem('refreshToken')
            });
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            // Update the original request with the new access token
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            // Retry the original request
            return axios(originalRequest);
          } catch (err) {
            console.error('Failed to refresh token:', err);
            // Redirect to login or do something else upon refresh token failure
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
    try {
        const res = await userApi.post('/login', { email, password }, {
            withCredentials: true
        });

        // Store tokens securely
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
       console.log('access',res.data.accessToken);
       console.log('refreshh',res.data.refreshToken)
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getProfile = async ()=>{
  try {
    const accessToken = localStorage.getItem('accessToken');
    console.log('getuser',accessToken);
    
    const res = await userApi.get('/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(res.data.status==401);
      
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

export default userApi;

  