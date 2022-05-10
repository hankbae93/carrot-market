import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const { phone, email } = req.body;
	const user = phone ? { phone: +phone } : email ? { email } : null;
	if (!user) {
		return res.status(400).json({ ok: false });
	}

	const payload = Math.floor(100000 + Math.random() * 900000) + "";
	const token = await client.token.create({
		data: {
			payload,
			user: {
				connectOrCreate: {
					where: {
						...user,
					},
					create: {
						name: "Anonymous",
						...user,
					},
				},
			},
		},
	});
	console.log(token);

	if (phone) {
		// const message = await twilioClient.messages.create({
		// 	messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
		// 	// to: phone
		// 	to: process.env.TWILIO_MY_PHONE!,
		// 	body: `Your login Token is ${payload}`,
		// });
		// console.log(message);
	}
	return res.json({ ok: true });

	/* if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  } */
}

export default withHandler("POST", handler);
