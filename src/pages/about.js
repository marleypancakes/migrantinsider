import React from "react"
import AboutPage from "../components/about/aboutPage"
import Seo from "../components/seo"
import Layout from "../components/layout"

const About = () => {
  return (
    <Layout>
      <Seo
        title="About - Migrant Insider"
        description="Migrant Insider is the first and only immigration news outlet in the Beltway."
      ></Seo>
      <AboutPage></AboutPage>
    </Layout>
  )
}

export default About
