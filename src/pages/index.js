import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

// Components
import Header from "../components/Home/header"
import FeatureSection from "../components/Home/featureSection"
import Testimonial from "../components/Home/testimonial"
import FeaturedBlog from "../components/FeaturedBlog"
import BlogHeader from "../components/Blog/blogHeader"
import BlogsContainer from "../components/Blog/blogsContainer"
import Seo from "../components/seo"


const IndexPage = ({data}) => {
  let HeaderPost = data?.allGhostPost?.edges[0]
  let otherPosts = data?.allGhostPost?.edges.slice(1)

  return(
  <div className="h-auto w-screen">
    <Layout>
      <Seo
        title="Migrant Insider"
        description="Migrant Insider is the first and only immigration news outlet in the Beltway. "
      ></Seo>
      <BlogHeader post={HeaderPost} />
      <FeatureSection></FeatureSection>
      <BlogsContainer data={otherPosts} />
    </Layout>
  </div>
  )
}
export default IndexPage

export const WorkPageQuery = graphql`
    query GhostPostQuery {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: 10
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`