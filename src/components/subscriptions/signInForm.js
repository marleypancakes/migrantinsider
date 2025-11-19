import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import TitleImage from "../../../static/img/migrantinsidertitle.png"

async function sendMagicLink(email) {
  try {
    console.log("[Sign In Form] Sending request for:", email);
    
    const response = await fetch('../../api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    console.log("[Sign In Form] Response status:", response.status);
    
    const data = await response.json();
    console.log("[Sign In Form] Response data:", data);
    
    return {
      statusCode: response.status,
      data: data
    };
    
  } catch (err) {
    console.error("[Sign In Form] Error:", err.message);
    return {
      statusCode: 500,
      data: { error: err.message }
    };
  }
}

const SignInForm = () => {
    const [serverResponse, setServerResponse] = React.useState(null)
    
    return (
        <Formik
        initialValues={{email: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Enter your email address';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setFieldError, setSubmitting }) => {          
          setTimeout(async () => {
            const response = await sendMagicLink(values.email);
            console.log("[Sign In Form] Final response:", response);
            
            setSubmitting(false);
            setServerResponse(response.statusCode);
            
            if(response.statusCode === 201) {
              document.getElementById("signinsuccess").style.display = "grid";
              document.getElementById("signinbody").style.display = "none";
            }
            else if (response.statusCode === 400){
              setFieldError("email", "No member exists with this email address.")
            }
            else if (response.statusCode === 404){
              setFieldError("email", "Authentication service unavailable. Please try again later.")
              console.error("Ghost API endpoint not found:", response.data);
            }
            else {
              console.error("Invalid Response:", response);
              setFieldError("email", "An error occurred. Please try again.")
            }
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 p-1">
              <img src={TitleImage} alt="Migrant Insider Logo"></img>
              <h1 className="w-100 h-auto text-center text-3xl font-extrabold leading-tight text-[#000000] lg:mb-6 lg:text-4xl dark:">
                Sign In
              </h1>
              <div id="signinbody" className="grid grid-cols-1 p-1">
                <div className="flex justify-between w-full">
                  <label htmlFor="email">Email</label>
                  <ErrorMessage name="email" component="label" className="block text-right text-sm"/>
                </div>
                <Field type="email" name="email" placeholder="name@example.com" className="w-full border p-2 rounded" />
                <button type="submit" disabled={isSubmitting} className="bg-darkorange rounded mt-3 p-2 text-white w-full">
                  {isSubmitting ? 'Sending...' : 'Continue'}
                </button>
              </div>
              <div id="signinsuccess" className="grid grid-col justify-items-center hidden w-100 h-100 z-99">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M44 12C44 9.8 42.2 8 40 8H8C5.8 8 4 9.8 4 12V36C4 38.2 5.8 40 8 40H40C42.2 40 44 38.2 44 36V12ZM40 12L24 22L8 12H40ZM40 36H8V16L24 26L40 16V36Z" fill="black"/>
                </svg>
                <h2 className="mt-2">Check your email for a link to finish signing in.</h2>
              </div>
            </Form>
        )}
      </Formik>    
    )
}

export default SignInForm