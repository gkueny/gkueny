import React from "react";
import PropTypes from "prop-types";

const Video = ({ url, title }) => (
  <video controls autoPlay muted loop className="video">
    <source src={url} title={title} type="video/mp4" />
  </video>
);

Video.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Video;
