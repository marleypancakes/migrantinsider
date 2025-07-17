import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import Button from "../Atoms/button"
import { Formik, Form, Field, ErrorMessage } from "formik"
import TitleImage from "../../../static/img/migrantinsidertitle.png"

const SubscribeForm = () => {
    const [serverResponse, setServerResponse] = React.useState(``)

    const data = useStaticQuery(graphql`
    query getTiers {
      allGhostTiers(
          filter: {active: {eq: true}}
      ) {
          edges {
            node {
              id
              name
              monthly_price
              description
            }
          }
      }
    }`);
    let tiers = data?.allGhostTiers?.edges?.map(item => {
      return {
        id: item.node.id,
        name: item.node.name,
        monthly_price: item.node.monthly_price,
        description: item.node.description,
      }
    })
    console.log(tiers);

    const handleSubmit = (tierID) => {
      document.subscribeform.tierselection = tierID;
      
    }
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
                .fetch(`../../api/subscribe`, {
                    method: `POST`,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then(res => res.json())
            setSubmitting(false);
            setServerResponse(response.json());
            console.log(serverResponse);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
            <Form className="grid-cols-1 p-1" name="subscribeform">
                <img src={TitleImage}></img>
                <h1 className="w-100 h-auto text-center  text-3xl font-extrabold leading-tight text-[#000000] lg:mb-6 lg:text-4xl dark:">
                Subscribe
                </h1>
                <Field type="hidden" name="tierselection"></Field>
                <Field type="name" name="name" />
                <ErrorMessage name="email" component="label" className="block w-full text-right text-sm pb-1"/>
                <Field type="email" name="email" placeholder="name@example.com" className="w-full border p-2 rounded" />

                {tiers.map((tier, i) => {
                  return (
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tier.name}</h5>
                        </a>
                        <a href="#" className="inline-flex flex-col items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{tier.description}</p>
                        <button disabled={isSubmitting} onClick={handleSubmit(tier.id)} className="bg-darkorange rounded p-2 text-white w-full">
                        Select
                        </button>
                        </a>
                    </div>
                  )
                })}



            </Form>
        )}
      </Formik>    
    )
}

export default SubscribeForm