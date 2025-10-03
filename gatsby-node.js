const path = require(`path`)
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  // const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/blog-post.js`);
  const tagTemplate = path.resolve(`src/templates/tag.js`)
  return graphql(
    `
{
  allGhostPost(
    sort: {published_at: ASC}
    filter: {authors: {elemMatch: {name: {eq: "Notes on the Crises"}}}}
  ) {
    edges {
      node {
        slug
      }
    }
  }
  allGhostTag(sort: {name: ASC}) {
    edges {
      node {
        slug
        url
        postCount
      }
    }
  }
  allGhostAuthor(sort: {name: ASC}) {
    edges {
      node {
        slug
        url
        postCount
      }
    }
  }
  allGhostPage(sort: {published_at: ASC}) {
    edges {
      node {
        slug
        url
      }
    }
  }
}    `
  ).then(result => {
    if (result.errors) {
      reporter.panicOnBuild('Error while running GraphQL Query');
      throw result.errors
    }
      // Extract query results
      const ghostTags = result.data.allGhostTag.edges;
      const tags = ["White House", "Courts", "ICE", "Border", "COBOL"]
      const authors = result.data.allGhostAuthor.edges;
      const pages = result.data.allGhostPage.edges;
      const posts = result.data.allGhostPost.edges;

    // const posts = result.data.allMarkdownRemark.edges
    // Template For blog-post
    posts.forEach(({node}) => {

      node.url = `/${node.slug.slice(0,40)}/`;

      actions.createPage({
        // path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        path: node.url,
        component: postTemplate,
        context: {
          slug: node.slug,
          limit: 10,
          skip:0,
        }, 
      })
    })

    tags.forEach((tag) => {
      var slug = tag.toLowerCase(); // Convert to lowercase
      slug = slug.replace(/\s+/g, "-"); // Replace spaces with hyphens
      var tagurl = `/tag/${slug}/`;

      actions.createPage({
        path: tagurl,
        component: tagTemplate,
        context: {
          tag: tag,
          slug: slug
        }
      })
    })
  
    return null
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  
  createTypes(`
    type GhostPost implements Node {
      featuredImg: File @link(from: "fields.localFile")
    }
  `)
}
exports.onCreateNode = async ({ node, actions: {createNode, createNodeField}, getNode, createNodeId, getCache, }) => {
    if(node.internal.type === "GhostPost" && node.feature_image !== null)
    {
      // console.log("Creating Ghost Post Node")
      const fileNode = await createRemoteFileNode({
        url: node.feature_image,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      })

      if(fileNode) {
        createNodeField({ node, name: "localFile", value: fileNode.id })
        // console.log("Featured image node created at "+ node.feature_image);
      }
    }
}

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       fallback: {
//         crypto: require.resolve("crypto-browserify"), // Use crypto-browserify as a polyfill
//         stream: 
//       },
//     },
//   });
// };
