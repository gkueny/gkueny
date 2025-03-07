import PropTypes from "prop-types";

const Layout = ({ children, header, footer, padding = false }) => {
  return (
    <div className={padding ? "pt-4 pb-16" : ""}>
      {header}
      <main>{children}</main>
      {footer}
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  padding: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Layout;
