import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Header = ({ title, titleLink }) => {
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
    <header
      className="flex py-4 justify-center "
      style={{ marginLeft: "-9rem" }}
    >
      <div className="flex flex-1 items-center justify-start max-w-3xl">
        <Link to="/">
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
};

export default Header;
