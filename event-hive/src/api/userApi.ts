import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'
import { IUser } from '../types/schema'

const userApi : AxiosInstance = axios.create({
    baseURL:'http://localhost:3003/api/user'
})

userApi.interceptors.request.use(
    (config: any) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
userApi.interceptors.response.use(
    (response: AxiosResponse) => {
      // Do something with successful response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  export const signUp = async ({first_name,last_name,email,mobile,password,confirm_password}:IUser) =>{
    try {
      if(password!=confirm_password){
        alert('password and confirm password not match')
      }
      const res =await userApi.post('/signup',{first_name,last_name,email,mobile,password,confirm_password},{
        withCredentials:true
      })
      
      console.log(res.data.token)
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const login = async ({email,password}:{
    email:string;
    password:string;
  }) =>{
    try {
      const res = await userApi.post('/login',{email,password},{
        withCredentials:true
      })
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
 
  