import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'

const adminApi : AxiosInstance = axios.create({
    baseURL:'http://localhost:3003/api/admin'
})

adminApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('adminAccessToken');
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

  adminApi.interceptors.response.use(
    (response) => {
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('adminRefreshToken')
        
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            const response = await adminApi.post("http://localhost:3003/api/admin/refresh-token", {
              refreshToken
            },{withCredentials:true});
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('userAccessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return adminApi(originalRequest)
          } catch (err) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
);


  export const login = async ({email,password}:
    {
    email:string;
    password:string;
  }) =>{
    try {
        const res = await adminApi.post('/admin-login',{email,password},{
            withCredentials:true
        })
        return res
    } catch (error) {
        console.log(error);
        
    }
  }
  export const getUser = async () =>{
     try {
      console.log('getusre jkbbk');
      
        const res = await adminApi.get('/get-user',{withCredentials:true})
        console.log('res fro adapter',res)
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
  export const getEventWithCompany = async () =>{
    try {
       const res = await adminApi.get('/get-events-with-company')

       console.log('res from event ==',res);
       return res
    } catch (error) {
      console.log(error)
    }
  }
  export const blockEvent = async (eventId : string) =>{
    try {
      const res = await adminApi.patch('/event-block',{eventId:eventId})
      return res
    } catch (error) {
      console.log(error);
    }
  }
  export const getAllCompany  = async () =>{
    try {
       const res = await adminApi.get('/all-company')
       return res
    } catch (error) {
      console.log(error)
    }
  }
  export const blockCompany = async (companyId:string) =>{
    try {
      const res = await adminApi.patch('/block-company',{companyId:companyId})
      return res
    } catch (error) {
      console.log(error);
      
    }
  }