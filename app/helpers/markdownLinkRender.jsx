import PropTypes from "prop-types";
import { Link } from "@remix-run/react";

const MarkdownLinkRender = ({ href, children }) => {
  if (href && href[0] === "/") {
    return (
      <Link
        to={href}
        className="text-lg text-blue-700 hover:text-blue-800 hover:underline"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="text-lg text-blue-700 hover:text-blue-800 hover:underline"
    >
      {children}
    </a>
  );
};

MarkdownLinkRender.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default MarkdownLinkRender;
