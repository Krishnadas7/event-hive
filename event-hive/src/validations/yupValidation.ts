import * as Yup from 'yup'

// validation for login
export const loginValidation = Yup.object({
    email: Yup.string()
    .email("please enter valid email")
    .required("please enter email"),
    password: Yup.string().required("Please enter password")
    .min(6, "Password must be at least 6 characters")
  .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
  ),
})
export const companyLogin = Yup.object({
  company_email:Yup.string()
  .required("please enter a email"),
  password: Yup.string()
  .required("please enter a password")
  .min(6, "Password must be at least 6 characters")
  .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
  )
})
export const companyRegisterValidation = Yup.object({
  company_name:Yup.string()
  .required("please enter company name"),
  company_email:Yup.string()
  .required("please enter company email"),
  password: Yup.string()
  .required("please enter a password")
  .min(6, "Password must be at least 6 characters")
  .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
  ),
  confirm_password: Yup.string()
  .required("please enter a password")
  .min(6, "Password must be at least 6 characters")
  .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
  ),
  company_website:Yup.string()
  .required("please enter company website"),
  company_address:Yup.string()
  .required("please enter company address"),
  industry_type:Yup.string()
  .required("please enter industry"),
  company_description:Yup.string()
  .required("please enter description"),
})
export const userProfileValidation = Yup.object({
  first_name:Yup.string(),
  last_name:Yup.string(),
  address_line1:Yup.string(),
  address_line2:Yup.string(),
  post_code:Yup.string()
  .min(6,"Enter valid postcode"),
  locality:Yup.string(),
  state:Yup.string(),
  bio:Yup.string()
})
export const editProfileValidation = Yup.object({
  first_name:Yup.string(),
  last_name:Yup.string(),
  bio:Yup.string(),
  qualification:Yup.string(),
  socialmedialink1:Yup.string(),
  socialmedialink2:Yup.string()
})
export const companyEditProfileValidation = Yup.object({
  company_name: Yup.string().required('Please enter company name'),
  company_email: Yup.string().required('Please enter company email'),
  company_address: Yup.string().required('Enter company address'),
  postal_code: Yup.string().required('Enter the pin code'),
  locality: Yup.string().required('Enter locality'),
  state: Yup.string().required('Enter your state'),
  company_description: Yup.string().required('Enter your company description'),
  company_website: Yup.string().required('Enter company website'),
  company_contactperson: Yup.string().required('Enter contact name'),
  company_contactphone: Yup.string().required('Enter contact phone'),
  country: Yup.string().required('Enter country'),
  industry_type: Yup.string().required('Select any industry'),
  // company_logo: Yup.mixed().required('Select company logo')
});
export const resetValidation = Yup.object({
  password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
})
export const forgotValidation = Yup.object({
  email:Yup.string()
  .email("please enter valid email")
  .required("please enter email")
})

export const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(3)
      .max(30)
      .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
      .required("Please enter name"),
      last_name: Yup.string()
      .min(3)
      .max(30)
      .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
      .required("Please enter name"),

    mobile: Yup.string()
      .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
      .required("Please enter mobile"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Please enter password"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Please enter confirm password"),
  });