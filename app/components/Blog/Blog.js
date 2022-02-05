import Layout from "../Layout";
import Header from "../Layout/Header";
import ArticlesList from "../Articles/List";
import Pagination from "../Pagination";

const BlogPage = () => {
  const articles = [];
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
};

export default BlogPage;
