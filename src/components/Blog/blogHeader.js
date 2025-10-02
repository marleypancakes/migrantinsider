import { Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Fade from "react-reveal/Fade"

const BlogHeader = ({ post }) => {
  const image = getImage(post.node.featuredImg)
  return (
    <div className="max-w-7xl xxs:mx-4 sm:mx-auto mt-10">
      <Fade duration={2200}>
        <div className="flex flex-row justify-space xxs:flex-col-reverse xs:flex-col-reverse sm:flex-row mb-5">
          <div className="border-b-2 border-dg max-h-80 w-11/12 xxs:ml-0 xxs:mr-0 sm:ml-5 sm:mr-5 xxs:mt-5 xxs:mb-5 flex flex-col justify-center bg-transparent p-8 rounded-xl lg:m-5 xxs:w-full xs:w-full sm:w-full lg:w-full">
            <Link
              to={'../' + post.node.slug}
              style={{
                textDecoration: "none",
              }}
            >
              <h1 className="text-2xl font-semibold">
                {post.node.title}
              </h1>
              <p className="text-sm mt-2">{post.node.friendly_date} {'\u2022'} {post.node.authors[0].name}</p>
              <p className="text-sm mt-2 font-thin">{post.node.excerpt.slice(0,200)}...</p>
            </Link>
          </div>
          <div
            data-gatsby-image-wrapper=""
            className="my-5 mr-5 xxs:w-full xs:w-full sm:w-full lg:w-full"
          >
            <div className="overflow-hidden  rounded-xl xxs:w-full">
              {post.node.feature_image && (
                <Link
                  to={'../' + post.node.slug}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div className="max-h-80 w-auto h-full object-cover flex justify-center">
                    <GatsbyImage
                      image={image}
                      alt={post.node.title}
                      placeholder="none"
                      backgroundColor="none"
                      layout="fulWidth"
                      formats={["auto", "webp", "avif"]}
                      quality={100}
                      className="img"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default BlogHeader
