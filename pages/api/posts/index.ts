import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method === "GET") {
		const {
			query: { latitude, longitude },
		} = req;

		const lat = parseFloat(latitude.toString());
		const lng = parseFloat(longitude.toString());

		const posts = await client.post.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				_count: {
					select: {
						wonderings: true,
						answers: true,
					},
				},
			},
			where: {
				latitude: {
					gte: lat - 0.01,
					lte: lat + 0.01,
				},
				longitude: {
					gte: lng - 0.01,
					lte: lng + 0.01,
				},
			},
		});
		res.json({
			ok: true,
			posts,
		});
	}

	if (req.method === "POST") {
		const {
			body: { question, latitude, longitude },
			session: { user },
		} = req;
		const post = await client.post.create({
			data: {
				question,
				latitude,
				longitude,
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});

		res.json({
			ok: true,
			post,
		});
	}
}

export default withApiSession(
	withHandler({ methods: ["GET", "POST"], handler })
);
