import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import AccountPage from "../components/Account/accountPage"

const Account = () => {
  return (
    <Layout>
      <Seo
        title="Account"
        description="View Account Details"
      ></Seo>

        <AccountPage></AccountPage>
    </Layout>
  )
}

export default Account
