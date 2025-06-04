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
        title="Holo - Blog"
        description="Holo is a visually striking and highly customizable open source theme built on the powerful Gatsby framework and integrated with the versatile Decap CMS"
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
