import React from "react";
import PropTypes from "prop-types";

import "./layout.scss";

const Layout = ({ children, header, padding = false }) => {
  return (
    <div className={padding ? "pt-4 pb-16" : ""}>
      {header}
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.node,
  padding: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Layout;
