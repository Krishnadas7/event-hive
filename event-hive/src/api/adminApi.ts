import axios,{AxiosInstance} from 'axios'
console.log('User API:', process.env.USER_API);
console.log('Admin API:', process.env.ADMIN_API);


const ADMIN_API = process.env.ADMIN_API
const ADMIN_REFRESH_API = process.env.ADMIN_REFRESH_API

const adminApi : AxiosInstance = axios.create({
    baseURL:ADMIN_API
})

adminApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('adminAccessToken');
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
            const response = await adminApi.post(ADMIN_REFRESH_API as string, {
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
        const res = await adminApi.get('/get-user',{withCredentials:true})
        console.log('res fro adapter',res)
        return res
     } catch (error) {
      console.log(error);
      
     }
  }
  export const blockUnblock = async (_id:string) =>{
    try { 
      const res = await adminApi.patch(`/user/block-unblock?_id=${_id}`)
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const getEventWithCompany = async () =>{
    try {
       const res = await adminApi.get('/get-events-with-company')
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
  export const usersCount = async () =>{
    try {
      const res = await adminApi.get('/users-count')
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const eventCount = async () =>{
    try {
      const res = await adminApi.get('/event-count')
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const liveEventCounts = async () =>{
    try {
      const res = await adminApi.get('/live-event-count')
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const piechartData = async () =>{
    try {
      const res = await adminApi.get('/pie-chart-data')
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const filterUsers = async () =>{
    try {
      const res = await adminApi.get('/filter-users')
      return res
    } catch (error) {
      console.log(error);
      
    }
  }
  export const todaySales = async () =>{
    try {
       const res = await adminApi.get('/today-sales')
      return res
       
    } catch (error) {
      console.log(error);
    }
  }
  export const totalSales = async () =>{
    try {
      const res = await adminApi.get('/total-sales')
      return res
    } catch (error) {
      console.log(error)
    }
  }
  export const filterSalesReport = async (pagination:number) =>{
    try {
      const res = await adminApi.get('/filter-sales-report',{
        params:{pagination:pagination}
      })

      return res
    } catch (error) {
      console.log(error)
    }
  }
  export const completeReport =async () =>{
    try {
      const res = await adminApi.get('/complete-report')
      return res
    } catch (error) {
      console.log(error);
      
    }
  }