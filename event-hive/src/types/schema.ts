
export interface IUser {
    _id?:string;
    first_name: string;
    last_name: string;
    email: string;
    is_block?:boolean;
    profileImg?:string;
    mobile: string;
    team?:string[];
    password: string;
    profileImage:string;
    confirm_password: string;
}
export interface IEvent {
    _id?: string;
    event_name: string;
    event_type: string;
    start_date: string;
    starting_time: string;
    end_date: string;
    participants:string;
    ending_time: string;
    ticket: string;
    amount: string;
    users_limit: string;
    event_description: string;
    registrations: string[];
    is_block: boolean;
    event_poster: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    companyDetails: any;
    company_id: string; 
}
export interface EventStatus {
    name: string;
    value: number;
  }
  export interface ISalesReport {
    _id: string;
    user_name: string;
    event_name: string;
    company_name: string;
    booking_date: string;
    payment_status: string;
    payment_amount: string;
    ticket_type: string;
  }
  export interface RegisterInfoType{
    first_name:string;
    last_name:string;
    email:string;
    mobile:string;
    password:string;
    confirm_password:string;
  }
  export interface ICompany{
    _id?:string;
    company_name?:string;
    company_email?:string;
    password?:string;
    company_logo?:string;
    confirm_password?:string;
    is_block?:boolean;
    contact_personname?:string;
    contact_personphone?:string;
    company_website?:string;
    company_address?:string;
    city?:string;
    state?:string;
    postal_code?:string;
    otp?:string;
    locality?:string;
    country?:string;
    industry_type?:string;
    company_description?:string;
    
}
export interface Obj{
  userEmail:string;
  report:string;
}
export interface ReportData{
  userEmail:string
  report:string
}