import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.ua?.isBot) {
		return new Response("Don't be a bot");
	}
	if (!req.url.includes("/api")) {
		if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
			return NextResponse.redirect("/enter");
		}
	}
}
