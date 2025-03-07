import { useLoaderData } from "@remix-run/react";
import Layout from "../../components/Layout";
import Header from "../../components/Layout/Header";
import ArticlesList from "../../components/Articles/List";
import Pagination from "../../components/Pagination";
import { getArticles } from "../../loaders/articles.server";
import ProfilHeaderBlog from "../../images/profil-blog.webp";

export const links = () => {
  return [
    {
      rel: "preload",
      href: ProfilHeaderBlog,
      as: "image",
    },
  ];
};

export function meta({ params }) {
  const title = "Blog | Gaëtan Kueny";
  return [
    {
      title: params.page ? `Blog page ${params.page} | Gaëtan Kueny` : title,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "twitter:title",
      content: title,
    },
  ];
}

export function headers() {
  return {
    "Cache-Control":
      "max-age=43200, stale-while-revalidate=43200, s-maxage=86400",
  };
}

const articleByPage = 5;

export let loader = async ({ params }) => {
  const page = params.page ? parseInt(params.page, 10) : 1;
  const articles = await getArticles();

  const nbPages = Math.ceil(articles.length / articleByPage);
  const skip = (page - 1) * articleByPage;

  return {
    currentPage: page,
    nbPages,
    articles: articles.slice(skip, skip + articleByPage),
  };
};

export default function Index() {
  const { articles, nbPages, currentPage } = useLoaderData();
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
      <section className="flex flex-1 flex-col items-center justify-center">
        <ArticlesList articles={articles} withLink={false} />
      </section>
    </Layout>
  );
}
