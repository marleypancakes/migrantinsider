import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51QbeILIxVmr2FZcZzG0nNVld4nLARBuwNpE6x8kZPVUiNVXZFu2pmqrPFo2Ouu01I1AxYneS4fWpxaDXvbqyYp7p00YDPFQChB")
  }
  return stripePromise
}

const Checkout = ({price}) => {
    const [loading, setLoading] = useState(false)

    const redirectToCheckout = async event => {
      event.preventDefault()
      setLoading(true)
  
      const stripe = await getStripe()
      const { error } = await stripe.redirectToCheckout({
        mode: "payment",
        lineItems: [{ price: "price_1GriHeAKu92npuros981EDUL", quantity: 1 }],
        successUrl: `http://localhost:8000/subscribe-success/`,
        cancelUrl: `http://localhost:8000/`,
      })
  
      if (error) {
        console.warn("Error:", error)
        setLoading(false)
      }
    }
  
    return (
      <button
        disabled={loading}
        onClick={redirectToCheckout}
      >
        Continue
      </button>
    )
  }

export default Checkout