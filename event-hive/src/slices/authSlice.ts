import {createSlice} from '@reduxjs/toolkit';

export interface UserInfo{
    _id?: string;
    email: string;
    name: string;
    mobile?: string;
    password?: string;
    createdAt?:string
}
interface InitialState {
    userInfo:  UserInfo | null // UserInfo | null;
    adminInfo: UserInfo | null
    registerInfo: UserInfo | null
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");

// localStorage.removeItem('userInfo');

const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
    adminInfo: adminInfoFromLocalStorage? JSON.parse(adminInfoFromLocalStorage): null,
    registerInfo: registerInfoFromLocalStorage
    ? JSON.parse(registerInfoFromLocalStorage)
    : null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state:any, action:any) => {
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
          adminLogOut: (state) => {
            state.adminInfo = null;
            localStorage.removeItem("adminInfo")
          },
          setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
          },
        }
})
export const {
    setCredential,
    userLogOut,
    adminLogOut,
    setRegister,
    clearRegister,
    setAdminCredentials,
} = authSlice.actions;

export default authSlice.reducer;