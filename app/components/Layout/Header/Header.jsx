import React from "react";
import PropTypes from "prop-types";
import { Link } from "@remix-run/react";
import Profil from "../../../images/profil-blog.webp";

const Header = ({ title = null, breadcrumb = [] }) => {
  return (
    <header className="flex flex-col py-4 px-6 justify-center header lg:px-0">
      <div className="flex flex-1 items-center justify-start max-w-3xl w-full mx-auto">
        <Link to="/">
          <meta name="name" content="Accueil" />
          <img
            width="48"
            height="48"
            sizes="(min-width: 48px) 48px, 100vw"
            src={Profil}
            className="w-12 h-12 mr-6 rounded-full"
            alt="gkueny"
          ></img>
        </Link>

        {breadcrumb.map((path, i) => {
          if (i === breadcrumb.length - 1 && !title) {
            return (
              <div key={i} className="text-2xl">
                <h1 className="text-gray-900 leading-none">
                  <Link
                    to={path.link}
                    className="hover:text-blue-800 hover:underline"
                  >
                    {path.title}
                  </Link>
                </h1>
              </div>
            );
          }

          return (
            <React.Fragment key={i}>
              <div className="text-2xl">
                <h2 className="text-gray-900 leading-none">
                  <Link
                    to={path.link}
                    className="hover:text-blue-800 hover:underline"
                  >
                    {path.title}
                  </Link>
                </h2>
              </div>
              {i < breadcrumb.length - 1 && <div className="mx-2">-</div>}
            </React.Fragment>
          );
        })}
      </div>
      {title && (
        <div className="max-w-3xl w-full mx-auto pb-4 pt-10">
          <h1 className="text-4xl text-gray-900 leading-none">{title}</h1>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default Header;
