export interface IUser {
    _id?:string;
    first_name: string;
    last_name: string;
    email: string;
    is_block?:boolean;
    mobile: string;
    password: string;
    confirm_password: string;
}