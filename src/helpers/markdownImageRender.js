import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Video from "../components/Video";

const MarkdownImageRender = ({ src, imageData, alt = "" }) => {
  if (!imageData) {
    return <img src={src} alt={alt} />;
  }

  if (imageData.isVideo) {
    return <Video url={imageData.url} title={alt} />;
  }

  return <Img alt={alt} fluid={imageData.image.childImageSharp.fluid} />;
};

MarkdownImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  images: PropTypes.object,
};

export default MarkdownImageRender;
