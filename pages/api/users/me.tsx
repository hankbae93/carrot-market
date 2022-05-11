import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	// console.log(req.session.user);
	const profile = await client.user.findUnique({
		where: { id: req.session.user?.id },
	});
	res.json({
		ok: true,
		profile,
	});
}

// serverless의 경우 각 api들이 별개의 url로 동작하여 공통으로 가지고 있는 state가 없어 helper fn을 매번 활용해줘야하낟
export default withApiSession(withHandler({ methods: ["GET"], handler }));
