import React, { useRef, useEffect } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import format from "date-fns/format";
import locale from "date-fns/locale/fr";
import Markdown from "../../Markdown";
import Layout from "../../Layout";
import SEO from "../../Seo";
import Header from "../../Layout/Header";
import "./article.css";

const Article = ({ data: { article, profilImage } }) => {
  const buttonGoToTopRef = useRef();

  const listener = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      buttonGoToTopRef.current.style.display = "block";
    } else {
      buttonGoToTopRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const {
    title,
    slug,
    date,
    excerpt,
    content,
    keywords,
    image,
    credit,
    markdownImages,
    markdownVideos,
  } = article;

  return (
    <Layout
      header={
        <Header
          title={title}
          link={`/${slug}`}
          breadcrumb={[
            {
              title: "Accueil",
              link: "/",
            },
            {
              title: "Blog",
              link: "/blog",
            },
          ]}
        />
      }
      padding
    >
      <SEO title={title} description={excerpt} />
      <article className="flex flex-col">
        {image && (
          <div
            className="text-center w-full"
            style={{
              maxWidth: "70rem",
              margin: "auto",
            }}
          >
            <Img alt={credit} fluid={image.image.childImageSharp.fluid} />
          </div>
        )}
        <div className="flex justify-center px-6">
          <div className="max-w-3xl w-full leading-normal lg:leading-loose">
            <span className="text-gray-700 text-xs">
              Publié le {format(new Date(date), "dd MMMM yyyy", { locale })}
            </span>
            <div className="py-4">
              {keywords &&
                keywords.split(",").map((keyword, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2"
                  >
                    #{keyword}
                  </span>
                ))}
            </div>

            <Markdown
              markdownImages={markdownImages}
              markdownVideos={markdownVideos}
              source={content}
              escapeHtml={false}
            />
          </div>
        </div>
      </article>
      <section className="max-w-3xl w-full my-8 mx-6 pl-2 border-l-4 border-gray-500">
        <span
          className="italic text-base"
          dangerouslySetInnerHTML={{ __html: credit }}
        ></span>
      </section>
      <section className="flex flex-1 justify-start my-12 px-2">
        <div className="flex items-center max-w-3xl w-full mx-auto">
          <Img
            alt="gkueny"
            className="flex-none w-20 h-20 mr-5 px-1 rounded-full"
            fluid={profilImage.childImageSharp.fluid}
          />
          <div className="flex flex-col">
            <h2 className="text-gray-900 text-xl leading-relaxed">
              À propos de l'auteur - gkueny{" "}
              <span className="text-lg text-blue-500 hover:text-blue-800">
                <a
                  target="_blank"
                  href="https://www.occitech.fr"
                  rel="noopener noreferrer"
                >
                  @Occitech
                </a>
              </span>
            </h2>
            <p className="flex flex-1 flex-col items-center justify-center text-gray-800">
              Développeur depuis maintenant 4 ans, j'ai une grande affinité avec
              le front-end et les tests bien fait. Pas full-stack mais touche à
              tout, je suis également à l'aise sur du Symfony / php.
            </p>
          </div>
        </div>
      </section>
      <button
        ref={buttonGoToTopRef}
        onClick={goToTop}
        title="Retourner en haut de la page"
        className="go-top w-12 h-12 bg-gray-700 text-white fixed hidden rounded-full"
      >
        <svg
          className="w-6 h-6 m-auto"
          x="0px"
          y="0px"
          width="451.847px"
          height="451.846px"
          viewBox="0 0 451.847 451.846"
          fill="#fff"
        >
          <g>
            <path d="M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0   L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4   c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z" />
          </g>
        </svg>
      </button>
    </Layout>
  );
};

export default Article;
export const query = graphql`
  query ArticlePage($id: String!) {
    article(id: { eq: $id }) {
      title
      excerpt
      content
      slug
      date
      keywords
      credit
      image {
        id
        image {
          childImageSharp {
            fluid(maxWidth: 1120, maxHeight: 600, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      markdownImages {
        id
        initialUrl
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      markdownVideos {
        id
        initialUrl
        url
      }
    }
    profilImage: file(relativePath: { eq: "profil.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
