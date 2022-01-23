import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";
import Video from "../components/Video";

const MarkdownImageRender = ({
  src,
  markdownImage,
  markdownVideo,
  alt = "",
}) => {
  if (markdownVideo) {
    return <Video url={markdownVideo.url} title={alt} />;
  }

  if (markdownImage) {
    return <>
      <GatsbyImage image={markdownImage.image.childImageSharp.gatsbyImageData} alt={alt} />
      <span className="italic text-base">{alt}</span>
    </>;
  }

  return <img src={src} alt={alt} />;
};

MarkdownImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  markdownImage: PropTypes.object,
  markdownVideo: PropTypes.object,
};

export default MarkdownImageRender;
