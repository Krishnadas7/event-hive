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
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
// localStorage.removeItem('userInfo');

const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
    adminInfo: adminInfoFromLocalStorage? JSON.parse(adminInfoFromLocalStorage): null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state:any, action:any) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
          },
          setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
          },
        }
})
export const {
    setCredential,
    setAdminCredentials
} = authSlice.actions;

export default authSlice.reducer;