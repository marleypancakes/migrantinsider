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
        onSubmit={async (values, { setSubmitting }) => {          

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
              .then(res => res.json)
              setSubmitting(false);
              setServerResponse(response);
              console.log(serverResponse);
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
            <Form className="w-fit grid-cols-1 p-1 gap-4" name="subscribeform" id="subscribeform">
                <img src={TitleImage} className="w-1/2"></img>
                <h1 className="w-100 h-auto text-center  text-3xl font-extrabold leading-tight text-[#000000]  lg:text-4xl dark:">
                Subscribe
                </h1>
                <div className="w-1/3 grid grid-cols-auto gap-2">
                <div className="flex justify-between">
                <label htmlFor="name">Name</label>
                <ErrorMessage name="name" component="label" className="block text-right text-sm pb-1"/>
                </div>
                <Field type="name" name="name" placeholder="Your Name" className=" border p-2 rounded" />
                <div className="flex justify-between">
                <label htmlFor="email">Email</label>
                <ErrorMessage name="email" component="label" className="block text-right text-sm pb-1"/>
                </div>
                <Field type="email" name="email" placeholder="name@example.com" className="border p-2 rounded"  />
                </div>
                {/* <div role="group" aria-labelledby="my-radio-group" className="overflow-auto grid-cols-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-100 h-64"> */}
                {/* {tiers.map((tier, i) => {
                  return (
                    <label htmlFor={tier.id}>                    
                    <Field type="radio" name="tier" className="peer hidden" value={tier.id} id={tier.id}/>
                    <div className="h-full w-64 relative block p-4 grid gap-[10px] content-start border rounded-lg shadow cursor-pointer peer-checked:shadow-lightorange-500 peer-checked:bg-lightorange">
                    <div className="text-lg font-semibold h-fit"> {tier.name}</div>
                    <div className="text-xl font-bold h-fit">${tier.monthly_price ? tier.monthly_price : 0}</div>
                    <p className="text-gray-600 h-fit">{tier.description}</p>
                    </div>
                    </label>
                  )
                })} */}
                <Tiers />

               {/* <ErrorMessage name="tier" component="label" className="block text-right text-sm pb-1"/> */}
               {/* </div> */}
               <button type="submit" disabled={isSubmitting} className="bg-darkorange rounded p-2 text-white w-40">
                Continue
              </button>
            </Form>
        )}
      </Formik>    
    )
}

export default SubscribeForm