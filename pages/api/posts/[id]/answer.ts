import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		query: { id },
		session: { user },
		body: { answer },
	} = req;
	// 강의에서는 매번 생략되지만, 무조건 찾는데이터가 존재하는지부터 확인해야한다.
	const post = await client.post.findUnique({
		where: {
			id: +id.toString(),
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					avatar: true,
				},
			},
			answers: {
				select: {
					answer: true,
					id: true,
					user: {
						select: {
							id: true,
							name: true,
							avatar: true,
						},
					},
				},
			},
			_count: {
				select: {
					answers: true,
					wonderings: true,
				},
			},
		},
	});

	const newAnswer = await client.answer.create({
		data: {
			user: {
				connect: {
					id: user?.id,
				},
			},
			post: {
				connect: {
					id: +id.toString(),
				},
			},
			answer,
		},
	});

	res.json({
		ok: true,

		answer: newAnswer,
	});
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
