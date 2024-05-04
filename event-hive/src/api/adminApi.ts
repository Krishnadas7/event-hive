import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'

const adminApi : AxiosInstance = axios.create({
    baseURL:'http://localhost:3003/api/admin'
})

adminApi.interceptors.request.use(
    (config: any) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
adminApi.interceptors.response.use(
    (response: AxiosResponse) => {
      // Do something with successful response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  export const login = async ({email,password}:
    {
    email:string;
    password:string;
  }) =>{
    try {
        const res = await adminApi.post('/login',{email,password},{
            withCredentials:true
        })
        return res
    } catch (error) {
        console.log(error);
        
    }
  }
  export const getUser = async () =>{
     try {
        const res = await adminApi.get('/get-user')
        return res
     } catch (error) {
      console.log(error);
      
     }
  }
  export const blockUnblock = async (_id:string) =>{
    try {
      console.log('admin apiiii');
      
      const res = await adminApi.patch(`/user/block-unblock?_id=${_id}`)
      return res
    } catch (error) {
      console.log(error);
      
    }
  }