import Layout from "@/components/layout";
import Head from "next/head";
import React from "react";
import { DataType } from "..";
import { getAllPostIds, getPostData } from "../../../lib/posts";

type Data = DataType & {
  contentHtml: any;
};

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

const Post = ({ postData }: { postData: Data }) => {
  return (
    <Layout home={undefined}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
};

export default Post;
