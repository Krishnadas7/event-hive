
export interface IUser {
    _id?:string;
    first_name: string;
    last_name: string;
    email: string;
    is_block?:boolean;
    profileImg?:string;
    mobile: string;
    password: string;
    profileImage:string;
    confirm_password: string;
}
export interface IEvent{
    _id?:string;
    event_name?:string;
    event_type?:string;
    start_date?:string;
    starting_time?:string;
    end_date?:string;
    ending_time?:string;
    users_limit?:string;
    event_description?:string;
    is_block?:boolean;
    event_poster?:string;
    company_id?:any; 
    companyDetails?:any;
}