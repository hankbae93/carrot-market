import { readdirSync } from "fs";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Layout from "@components/layout";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
	return (
		<Layout title={data?.title ?? "BLOG"}>
			<div
				className='blog-post-content'
				dangerouslySetInnerHTML={{ __html: post }}
			/>
		</Layout>
	);
};

export function getStaticPaths() {
	const file = readdirSync("./posts").map((file) => {
		const [name, extension] = file.split(".");
		return {
			params: {
				slug: name,
			},
		};
	});

	return {
		paths: file,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);
	const { value } = await unified()
		.use(remarkParse)
		.use(remarkHtml)
		.process(content);

	return {
		props: {
			data,
			post: value,
		},
	};
};

export default Post;
