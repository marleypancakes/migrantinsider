import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Field, ErrorMessage } from "formik"

const formatPrice = (amount, currency) => {
    let price = (amount / 100).toFixed(2)
    let numberFormat = new Intl.NumberFormat(["en-US"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
  }

export default function Tiers(props) {
        const data = useStaticQuery(graphql`
          query ProductPrices {
            prices:   allStripePrice(
                filter: {product: {id: {in: ["prod_So4hNSdqVzRw0y", "prod_SmVbmi1Km0E8Yc"]}},
                        active: {eq: true}}
                sort: {unit_amount: ASC}

            ) {
                edges {
                    node {
                        id
                        product {
                            name
                            id
                            description
                        }
                        active
                        currency
                        unit_amount
                        recurring {
                            interval
                        }
                    }
                }
            }
          }
        `)

        return(
            <div role="group" aria-labelledby="my-radio-group" className="overflow-auto grid-cols-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-100 h-64">
                <label htmlFor="free">                    
                    <Field type="radio" name="tier" className="peer hidden" value="free" id="free"/>
                    <div className="h-full w-64 relative block p-4 grid gap-[10px] content-start border rounded-lg shadow cursor-pointer peer-checked:shadow-lightorange-500 peer-checked:bg-lightorange">
                        <div className="text-lg font-semibold h-fit"> Free</div>
                        <div className="text-xl font-bold h-fit">$0</div>
                        <p className="text-gray-600 h-fit">Access to Public Posts</p>
                    </div>
                </label>
            {data.prices.edges.map(({ node: price }) => (
                <label htmlFor={price.id}>                    
                    <Field type="radio" name="tier" className="peer hidden" value={price.id} id={price.id}/>
                    <div className="h-full w-64 relative block p-4 grid gap-[10px] content-start border rounded-lg shadow cursor-pointer peer-checked:shadow-lightorange-500 peer-checked:bg-lightorange">
                        <div className="text-lg font-semibold h-fit"> {price.product.name}</div>
                        <div className="text-xl font-bold h-fit">{formatPrice(price.unit_amount, price.currency)}</div>
                        <p className="text-gray-600 h-fit">{price.product.description}</p>
                    </div>
                </label>
            ))}
            <ErrorMessage name="tier" component="label" className="block text-right text-sm pb-1"/>
            </div>
        )
    }