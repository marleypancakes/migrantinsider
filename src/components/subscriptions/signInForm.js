import React from "react"
import Button from "../Atoms/button"
import { Formik, Form, Field, ErrorMessage } from "formik"
import TitleImage from "../../../static/img/migrantinsidertitle.png"

const SignInForm = () => {
    const [serverResponse, setServerResponse] = React.useState(``)

    return (
        <Formik
        initialValues={{name: '',  email: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Email';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {          
          setTimeout(async () => {
            const response= await window
                .fetch(`../../api/ghost`, {
                    method: `POST`,
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then(res => res.json())
            setSubmitting(false);
            setServerResponse(response);
            console.log(serverResponse);
            if(serverResponse == 200){
              document.getElementById()
            }
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
            <Form className="grid-cols-1 p-1">
              <img src={TitleImage}></img>
              <h1 className="w-100 h-auto text-center  text-3xl font-extrabold leading-tight text-[#000000] lg:mb-6 lg:text-4xl dark:">
                Sign In
              </h1>
              <div>
                <ErrorMessage name="email" component="label" className="block w-full text-right text-sm pb-1"/>
                <Field type="email" name="email" placeholder="name@example.com" className="w-full border p-2 rounded" />
              </div>
              <button type="submit" disabled={isSubmitting} className="bg-darkorange rounded p-2 text-white w-full">
                Continue
              </button>
              <div id="signinsuccess grid-cols-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="gh-portal-icon gh-portal-icon-envelope">
                  <defs>
                    <style>.a{"fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1px;"}</style>
                  </defs>
                  <rect class="a" x="0.75" y="4.5" width="22.5" height="15" rx="1.5" ry="1.5"></rect>
                  <line class="a" x1="15.687" y1="9.975" x2="19.5" y2="13.5"></line>
                  <line class="a" x1="8.313" y1="9.975" x2="4.5" y2="13.5"></line>
                  <path class="a" d="M22.88,5.014l-9.513,6.56a2.406,2.406,0,0,1-2.734,0L1.12,5.014"></path>
                </svg>
                <h2>Now check your email!</h2>
              </div>
            </Form>
        )};
      </Formik>    
    )
}

export default SignInForm