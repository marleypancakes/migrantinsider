import React from "react"
import Button from "../Atoms/button"
import { Formik, Form, Field, ErrorMessage } from "formik"



const SubscribeForm = () => {
    const [serverResponse, setServerResponse] = React.useState(``)

    return (
        <Formik
        initialValues={{name: '',  email: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
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
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
            <Form>
                <Field type="name" name="name" />
                <ErrorMessage name="name" component="div" />
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <button type="submit" disabled={isSubmitting}>
                Submit
                </button>
            </Form>
        )}
      </Formik>    
    )
}

export default SubscribeForm