export interface FormValues {
    first_name: string;
    last_name:string;
    email:string;
    password: string;
    confirm_password: string;
    mobile:string
  }

  export interface FormLogin {
    email: string;
    password: string
  }

  export interface MyError {
    data?: {
      message?: string;
    };
    error?: string;
  }

  export interface Booking {
    _id?: string;                   
    user_id?: string;                 // Reference to the user making the booking
    event_id?: string;                // Reference to the event being booked
    company_id?: string;              // Reference to the company hosting the event
    booking_date?: any;           // Date when the booking was made (ISO format)
    payment_status?: string; // Status of the payment
    payment_amount?: string;         // Amount paid for the booking
    ticket_type?: string;   // Type of ticket (free or paid)
    eventDetails?:any;
  }

  export interface Event{
    _id?:string;
    event_name?:string;
    event_type?:string;
    start_date?:string;
    live?:string;
    starting_time?:string;
    end_date?:string;
    ending_time?:string;
    ticket?:string;
    amount?:string;
    users_limit?:string;
    event_description?:string;
    registrations?:string[];
    is_block?:boolean;
    event_poster?:string;
    company_id?:string; 
  }
  