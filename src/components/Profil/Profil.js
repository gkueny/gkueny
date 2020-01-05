import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import ArticlesList from "../Articles/List";

const Profil = ({ name, company, companyLink, hashtags, articles = null }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "profil.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className="flex flex-col h-full py-12 lg:h-screen lg:flex-row lg:py-0">
      <section className="flex flex-1 items-center justify-center">
        <Img
          alt="gkueny"
          className="w-12 h-12 mr-1 px-1 lg:px-0 lg:w-48 lg:h-48 lg:mr-6 rounded-full"
          fluid={data.placeholderImage.childImageSharp.fluid}
        />
        <div className="text-4xl">
          <h1 className="text-gray-900 leading-relaxed">
            {name}{" "}
            <span className="text-2xl text-blue-500 hover:text-blue-800">
              <a target="_blank" href={companyLink} rel="noopener noreferrer">
                {company}
              </a>
            </span>
          </h1>
          <p className="text-base text-gray-600">
            {hashtags.map(hashtag => `#${hashtag} `)}
          </p>
        </div>
      </section>
      {articles && (
        <section className="flex flex-1 flex-col items-center justify-center">
          <ArticlesList articles={articles} />
        </section>
      )}
    </div>
  );
};

Profil.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  companyLink: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string.isRequired),
  articles: ArticlesList.propTypes.articles,
};

export default Profil;
