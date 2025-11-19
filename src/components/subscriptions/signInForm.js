import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import TitleImage from "../../../static/img/migrantinsidertitle.png"

const SignInForm = () => {
    const [serverResponse, setServerResponse] = React.useState(``)
    const [ghostLoaded, setGhostLoaded] = React.useState(false)
    const [scriptError, setScriptError] = React.useState(null)

    React.useEffect(() => {
      // Check if script already exists
      if (document.querySelector('script[data-ghost]')) {
        console.log("[Sign In] Script already exists");
        return;
      }

      console.log("[Sign In] Loading Ghost Portal script...");
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@tryghost/portal@latest/umd/portal.min.js';
      script.setAttribute('data-ghost', 'https://notes-on-the-crises.ghost.io');
      script.setAttribute('data-api', 'https://notes-on-the-crises.ghost.io/ghost/api/content/');
      script.setAttribute('data-key', 'YOUR_CONTENT_API_KEY_HERE'); // Replace with your key
      script.async = true;
      
      script.onload = () => {
        console.log("[Sign In] Script loaded successfully");
        // Wait a bit for initialization
        setTimeout(() => {
          console.log("[Sign In] Checking window object:", Object.keys(window).filter(k => k.toLowerCase().includes('ghost')));
          setGhostLoaded(true);
        }, 500);
      };
      
      script.onerror = (error) => {
        console.error("[Sign In] Script failed to load:", error);
        setScriptError("Failed to load authentication system");
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Cleanup if needed
      };
    }, []);

    async function sendMagicLink(email) {
      try {
        console.log("[Sign In] Attempting to send magic link...");
        console.log("[Sign In] Available Ghost objects:", {
          GhostPortal: typeof window.GhostPortal,
          ghost: typeof window.ghost,
          allKeys: Object.keys(window).filter(k => k.toLowerCase().includes('ghost'))
        });
        
        // Manual fetch as fallback
        const response = await fetch('https://notes-on-the-crises.ghost.io/members/api/send-magic-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            emailType: 'signin'
          })
        });
        
        console.log("[Sign In] Direct API response:", response.status);
        return { statusCode: response.status };
        
      } catch (err) {
        console.error("[Sign In] Error:", err);
        return { statusCode: 500 };
      }
    }

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
            console.log("[Sign In Form] Status:", response.statusCode);
            
            setSubmitting(false);
            setServerResponse(response.statusCode);
            
            if(response.statusCode === 201) {
              document.getElementById("signinsuccess").style.display = "grid";
              document.getElementById("signinbody").style.display = "none";
            }
            else if (response.statusCode === 400){
              setFieldError("email", "No member exists with this email address.")
            }
            else {
              console.error("Invalid Response:", response.statusCode)
              setFieldError("email", "An error occurred. Please try again.")
            }
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 p-1">
              <img src={TitleImage} alt="Migrant Insider Logo"></img>
              <h1 className="w-100 h-auto text-center  text-3xl font-extrabold leading-tight text-[#000000] lg:mb-6 lg:text-4xl dark:">
                Sign In
              </h1>
              {scriptError && <div className="text-red-500 text-sm">{scriptError}</div>}
              <div id="signinbody" className="grid grid-cols-1 p-1">
              <div className="flex justify-between w-full">
                <label htmlFor="email">Email</label>
                <ErrorMessage name="email" component="label" className="block text-right text-sm"/>
              </div>
                <Field type="email" name="email" placeholder="name@example.com" className="w-full border p-2 rounded" />
              <button type="submit" disabled={isSubmitting} className="bg-darkorange rounded mt-3 p-2 text-white w-full">
                Continue
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