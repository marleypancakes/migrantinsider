import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SuccessPage = ({data}) => {  
    return(
    <div className="h-auto w-screen">
      <Layout>
        <Seo
          title="Migrant Insider Subscription Success"
          description="You have successfully subscribed to Migrant Insider"
        ></Seo>
        <h1 className="text-center font-bold text-5xl text-darkbrown">
            You have subscribed to Migrant Insider!
        </h1>
        <h2>
            Check your email for a link to confirm your subscription.
        </h2>
      </Layout>
    </div>
    )
  }
  export default SuccessPage
  