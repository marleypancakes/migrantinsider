/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-grow">
      {children}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Layout
