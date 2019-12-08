import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const MarkdownImageRender = ({ src, imageData, alt = "" }) => {
  if (!imageData) {
    return <img src={src} alt={alt} />;
  }

  return <Img alt={alt} fluid={imageData.image.childImageSharp.fluid} />;
};

MarkdownImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  images: PropTypes.object,
};

export default MarkdownImageRender;
