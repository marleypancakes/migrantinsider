import React from "react"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import BlogsContainer from "../components/Blog/blogsContainer"


const Tag  = ({data, pageContext}) => {
    let posts = data?.allGhostPost?.edges
    const {tag, slug} = pageContext;


    console.log("Posts from tag page: " + posts)

    return (
      <Layout>
        <Seo
          title="White House - Migrant Insider"
          description="Migrant Insider is the first and only immigration news outlet in the Beltway."
        ></Seo>
            <header className="mx-auto py-2 mb-4 lg:mb-6 not-format rounded bg-darkorange w-1/2 place-self-center">
              <h1 className="text-4xl font-extrabold text-white leading-tight text-[#000000] lg:mb-4 lg:text-5xl dark:format-invert text-center">
                {tag}
              </h1>
            </header>
      <BlogsContainer data={posts} />
      </Layout>
    )
  }
  
  export default Tag
  
  export const query = graphql`
    query GhostPostByTag($slug: String) {
      allGhostPost(
        sort: {published_at: DESC}
        filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
      ) {
            edges {
                node {
                    friendly_date: published_at(formatString: "MMMM D")
                    ...GhostPostFields
                }
            }
      }
    }
  `