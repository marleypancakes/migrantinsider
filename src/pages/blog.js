import React from "react"
import BlogHeader from "../components/Blog/blogHeader"
import BlogsContainer from "../components/Blog/blogsContainer"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"

const Blog = ({ data }) => {
  console.log("data", data)
  let HeaderPost = data?.allGhostPost?.edges[0]
  let otherPosts = data?.allGhostPost?.edges.slice(1)

  return (
    <Layout>
      <Seo
        title="Archive"
        description="Migrant Insider is the first and only immigration news outlet in the Beltway."
      ></Seo>
      <BlogHeader post={HeaderPost} />
      <BlogsContainer data={otherPosts} />
    </Layout>
  )
}

export default Blog

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
