import {createSlice} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { ICompany } from '../types/schema';


export interface UserInfo{
    _id?: string;
    email: string|null;
    name?: string;
    first_name?:string;
    last_name?:string;
    ProfileImg?:string;
    profileImg?:string;
    mobile?: string;
    password?: string;
    createdAt?:string;
    confirm_password?:string;
    timestamp?:number|null;
}

interface InitialState {
    userInfo:  UserInfo | null // UserInfo | null;
    adminInfo: UserInfo | null
    registerInfo: UserInfo | null
    timerInfo:number | null;
    companyInfo: ICompany | null
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const timerInfoFromLocalStorage = localStorage.getItem("timerInfo")
const companyInfoFromLocalStorage = localStorage.getItem('companyInfo')
// localStorage.removeItem('userInfo');

const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
    adminInfo: adminInfoFromLocalStorage? JSON.parse(adminInfoFromLocalStorage): null,
    registerInfo: registerInfoFromLocalStorage
    ? JSON.parse(registerInfoFromLocalStorage)
    : null,
    timerInfo: timerInfoFromLocalStorage ? JSON.parse(timerInfoFromLocalStorage) : null,
    companyInfo: companyInfoFromLocalStorage ?JSON.parse(companyInfoFromLocalStorage):null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
          },
          userLogOut: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
          },
          clearRegister: (state) => {
            state.registerInfo = null;
            localStorage.removeItem("registerInfo");
          },
          setRegister: (state, action) => {
            state.registerInfo = action.payload;
            localStorage.setItem("registerInfo", JSON.stringify(action.payload));
          },
          setCompany:(state,action) =>{
            state.companyInfo = action.payload
            localStorage.setItem("companyInfo",JSON.stringify(action.payload))
          },
          clearCompany:(state) =>{
            state.companyInfo = null;
            localStorage.removeItem("companyInfo")
          },
          setTimeInfo:(state, action) =>{
           state.timerInfo = action.payload
           localStorage.setItem("timerInfo", JSON.stringify(action.payload));
          },
          clearTimeInfo:(state) =>{
           state.timerInfo=null
           localStorage.removeItem("timerInfo")
          },
          adminLogOut: (state) => {
            state.adminInfo = null;
            localStorage.removeItem("adminInfo")
          },
          setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
          },
          // connectSocket(state) {
          //   if (!state.socket) {
          //     state.socket = io('ws://localhost:8900');
             
          //   }
          // },
          // disconnectSocket(state) {
          //   if (state.socket) {
          //     state.socket.disconnect();
          //     state.socket = null;
          //   }
          // },
        }
})
export const {
    setCredential,
    userLogOut,
    adminLogOut,
    setRegister,
    clearRegister,
    setTimeInfo,
    setAdminCredentials,
    setCompany,
    clearCompany,
    clearTimeInfo,
} = authSlice.actions;

export default authSlice.reducer;