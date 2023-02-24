import client from "client";
import { Module } from "src/components/templates/modulepicker";
import Layout from "src/layout";
import SeoHead from "src/components/seo/seohead";
import NotFoundPage from "pages/404";
import Fullpageloader from "src/components/atoms/actions/fullpageloader";
import { useRouter } from "next/router";
import { getPageData, getFooterData } from "lib/api";
import { useGetPages } from "src/components/atoms/fetcher/fetch";
import PreviewAlert from "src/components/atoms/actions/previewalert";

export default function Site({ pages = {}, footer, preview = false }) {
  const { seo = {}, slug = "" } = pages;
  const router = useRouter();

  // const { data: revalidatedPages, error } = useGetPages({
  //   initialData: pages,
  //   slug: pages?.slug,
  //   preview: preview,
  // });

  if (!router.isFallback && !pages?.slug) {
    return <NotFoundPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <Fullpageloader />;
  }

  if (!router.isFallback && pages?.slug) {
    return (
      <>
        {Object.keys(seo).length !== 0 && <SeoHead seo={seo} slug={slug} />}
        <Layout footer={footer != null ? footer : undefined}>
          {preview && <PreviewAlert />}
          {pages.pageBuilder?.map(function (obj, index) {
            //console.log({ ...Object.values(obj)[0] });
            //console.log("Module Name ist: ", Object.keys(obj)[0]);
            const content = { ...Object.values(obj)[0] };
            return (
              <Module moduleName={Object.keys(obj)[0]} content={content} />
            );
          })}
        </Layout>
      </>
    );
  }
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  );
  console.log("Die Statischen Paths sind: " + paths);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const { preview = false, previewData } = context;
  const pages = await getPageData(slug, preview);
  //const footer = await getFooterData();
  const footer = null;
  console.log("Die Page Daten in GSP sind für  " + slug + " sind da.");
  console.log(pages);
  return {
    props: {
      pages,
      footer,
      preview,
    },
    revalidate: process.env.SANITY_REVALIDATE_SECRET
      ? parseInt(process.env.SANITY_REVALIDATE_SECRET)
      : parseInt(86400),
  };
}
