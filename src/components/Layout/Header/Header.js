import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Header = ({ title, titleLink, homeLink = "/" }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "profil.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <header className="flex py-4 justify-center header">
      <div className="flex flex-1 items-center justify-start max-w-3xl">
        <Link to={homeLink}>
          <meta name="name" content="Accueil" />
          <Img
            className="w-12 h-12 mr-6 rounded-full"
            fluid={data.placeholderImage.childImageSharp.fluid}
          />
        </Link>
        <div className="text-4xl">
          <h1 className="text-gray-900 leading-relaxed">
            {titleLink ? (
              <Link to={titleLink} className=" hover:text-blue-800">
                {title}
              </Link>
            ) : (
              title
            )}
          </h1>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  titleLink: PropTypes.string,
  homeLink: PropTypes.string,
};

export default Header;
