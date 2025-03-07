import Layout from "../components/Layout";
import Profil from "../components/Profil";
import { useLoaderData } from "@remix-run/react";
import { getArticles } from "../loaders/articles.server";
import Profile from "../images/profil-index.webp";

export function headers() {
  return {
    "Cache-Control":
      "max-age=43200, stale-while-revalidate=43200, s-maxage=86400",
  };
}

export const links = () => {
  return [
    { page: "/blog" },
    {
      rel: "preload",
      href: Profile,
      as: "image",
    },
  ];
};

export let loader = async () => {
  const articles = await getArticles();

  return {
    articles: articles.slice(0, 2),
  };
};

export default function Index() {
  const { articles } = useLoaderData();
  return (
    <Layout>
      <Profil
        name="gkueny"
        company="- Lead Dev @Occitech"
        companyLink="https://www.occitech.fr"
        hashtags={["react", "react-native", "symfony", "magento2"]}
        articles={articles}
      />
    </Layout>
  );
}
