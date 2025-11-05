import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Formik, Form, Field, ErrorMessage } from "formik"
import TitleImage from "../../../static/img/migrantinsidertitle.png"
import Tiers from "./tiers"
import { loadStripe } from "@stripe/stripe-js"

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51QbeILIxVmr2FZcZzG0nNVld4nLARBuwNpE6x8kZPVUiNVXZFu2pmqrPFo2Ouu01I1AxYneS4fWpxaDXvbqyYp7p00YDPFQChB")
  }
  return stripePromise
}

const SubscribeForm = () => {
    const [serverResponse, setServerResponse] = React.useState(``)

    // const data = useStaticQuery(graphql`
    // query getTiers {
    //   allGhostTiers(
    //       filter: {active: {eq: true}}, limit:3
    //   ) {
    //       edges {
    //         node {
    //           id
    //           name
    //           monthly_price
    //           description
    //         }
    //       }
    //   }
    // }`);
    // let tiers = data?.allGhostTiers?.edges?.map(item => {
    //   return {
    //     id: item.node.id,
    //     name: item.node.name,
    //     monthly_price: item.node.monthly_price,
    //     description: item.node.description,
    //   }
    // })
    // console.log(tiers);
    return (
        <Formik
        initialValues={{name: '',  email: '', tier: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if(!values.name) {
            errors.name = 'Required';
          }
          if(!values.tier){
            errors.tier = 'Required'
          }
          return errors;
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setFieldError, setSubmitting }) => {          

          if(values.tier == "free"){
            setTimeout(async () => {
              const response= await window
              .fetch(`../../api/subscribe`, {
                method: `POST`,
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
              })
              .then((response) => {
                // console.log("[On Submit] Full response, inside", response);
                // console.log("Inside Promise: ", response.status);
                return response.status;
              })
              setSubmitting(false);
              setServerResponse(response);
              // console.log(serverResponse);
              if(response === 200) {
                document.getElementById("subscribesuccess").style.display = "grid";
                document.getElementById("subscribebody").style.display = "none";
              }
              else if (response === 400){
                setFieldError("email", "A member already exists with this email address.")
              }
              else {
                console.error("Invalid Response: ", response)
              }
            }, 400);
          } else {
            const stripe = await getStripe()
            const price = values.tier
            const { error } = await stripe.redirectToCheckout({
              mode: "subscription",
              lineItems: [{ price, quantity: 1 }],
              successUrl: `${window.location.origin}/success/`,
              cancelUrl: `${window.location.origin}/advanced`,
            })
        
            if (error) {
              console.warn("Error:", error)
            }
          }
        }}
      >
        {({ isSubmitting }) => (
            <Form className="w-200 sm:w-fit grid-cols-1 p-1 gap-4" name="subscribeform" id="subscribeform">
                <img src={TitleImage} className="w-1/2"></img>
                <h1 className="w-100 h-auto text-center  text-3xl font-extrabold leading-tight text-[#000000]  lg:text-4xl dark:">
                Subscribe
                </h1>
                <div id="subscribebody" className="grid grid cols-auto justify-items-center p-1 gap-4">
                <div className="grid grid-cols-auto  gap-2 w-1/2">
                <div className="flex justify-between w-64">
                <label htmlFor="name">Name</label>
                <ErrorMessage name="name" component="label" className="block text-right text-sm"/>
                </div>
                <Field type="name" name="name" placeholder="Your Name" className=" border p-2 rounded" />
                <div className="flex justify-between">
                <label htmlFor="email">Email</label>
                <ErrorMessage name="email" component="label" className="block text-right text-sm pb-1"/>
                </div>
                <Field type="email" name="email" placeholder="name@example.com" className="border p-2 rounded"  />
                </div>
                <Tiers />
               <button type="submit" disabled={isSubmitting} className="bg-darkorange rounded p-2 text-white w-40 justify-self-center ">
                Continue
              </button>
              </div>
              <div id="subscribesuccess" className="grid grid-col justify-items-center gap-5 hidden w-100 h-100 z-99">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M44 12C44 9.8 42.2 8 40 8H8C5.8 8 4 9.8 4 12V36C4 38.2 5.8 40 8 40H40C42.2 40 44 38.2 44 36V12ZM40 12L24 22L8 12H40ZM40 36H8V16L24 26L40 16V36Z" fill="black"/>
                </svg>
                <h2 className="mt-2">Check your email for a link to confirm your subscription.</h2>
              </div>

            </Form>
        )}
      </Formik>    
    )
}

export default SubscribeForm