const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
          allGhostPost(sort: { order: ASC, fields: published_at }) {
              edges {
                  node {
                      slug
                  }
              }
          }
          allGhostTag(sort: { order: ASC, fields: name }) {
              edges {
                  node {
                      slug
                      url
                      postCount
                  }
              }
          }
          allGhostAuthor(sort: { order: ASC, fields: name }) {
              edges {
                  node {
                      slug
                      url
                      postCount
                  }
              }
          }
          allGhostPage(sort: { order: ASC, fields: published_at }) {
              edges {
                  node {
                      slug
                      url
                  }
              }
          }
      }

    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
      // Extract query results
      const tags = result.data.allGhostTag.edges;
      const authors = result.data.allGhostAuthor.edges;
      const pages = result.data.allGhostPage.edges;
      const posts = result.data.allGhostPost.edges;
      console.log(posts);
      console.log("FUCKFUCKFUCKFUCKFUCK");
    
    // const posts = result.data.allMarkdownRemark.edges
    // Template For blog-post
    // const blogPost = posts.filter(item => item.node.frontmatter.templateKey === 'blog-post')
    posts.forEach((post, index) => {

      post.url = `/${post.node.slug}/`;

      createPage({
        // path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        path: post.url,
        component: path.resolve(
          `src/templates/blog-post.js`
        ),
        context: {
          slug: post.node.slug,
          limit: 10,
          skip:0,
        }, 
      })
    })
  
    return null
  })
}
// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   // if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   // }
// }