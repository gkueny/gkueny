import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data: { prismicHomePage } }) => {
  const { data } = prismicHomePage
  return (
    <Layout>
      <SEO title={data.title_seo.text} description={data.description_seo} />
      <h1>{data.title.text}</h1>
      <h2>{data.subtitle.text}</h2>
      <ul>
        {data.hashtags.map((element, i) => (
          <li key={i}>{element.hashtag}</li>
        ))}
      </ul>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query HomePage {
    prismicHomePage {
      id
      data {
        title {
          text
        }
        subtitle {
          text
        }
        hashtags {
          hashtag
        }
        title_seo {
          text
        }
        description_seo
      }
    }
  }
`
