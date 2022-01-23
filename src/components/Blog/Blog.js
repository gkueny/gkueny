import React from "react";
import { graphql } from "gatsby";
import Layout from "../Layout";
import Header from "../Layout/Header";
import ArticlesList from "../Articles/List";
import Seo from "../Seo";
import Pagination from "../Pagination";

const BlogPage = ({
  data: { allArticle },
  pageContext: { currentPage, numPages: nbPages },
}) => {
  const { nodes: articles } = allArticle;
  return (
    <Layout
      header={
        <Header
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
      footer={<Pagination currentPage={currentPage} nbPages={nbPages} />}
      padding
    >
      <Seo
        title="Blog"
        description="Développeur depuis maintenant 6 ans, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php."
      />
      <section className="flex flex-1 flex-col items-center justify-center">
        <ArticlesList articles={articles} withLink={false} />
      </section>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogPage($skip: Int!, $limit: Int!) {
    allArticle(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        title
        excerpt
        date
        slug
        keywords
      }
    }
  }
`;
