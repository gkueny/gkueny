import PropTypes from "prop-types";
import Video from "../components/Video";

const MarkdownImageRender = ({ baseArticleUrl, src, alt = "" }) => {
  if (src.includes(".mp4")) {
    return <Video url={`${baseArticleUrl}/${src}`} title={alt} />;
  }

  return (
    <div class="article-image article-image--gatsby text-grey-darker text-lg mt-2">
      <img src={`${baseArticleUrl}/${src}`} alt={alt} />
      <span class="italic text-base">Explain MariaDB 10.3</span>
    </div>
  );
};

MarkdownImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  markdownImage: PropTypes.object,
  markdownVideo: PropTypes.object,
};

export default MarkdownImageRender;
