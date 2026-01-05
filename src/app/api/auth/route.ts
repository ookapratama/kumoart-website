import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.GITHUB_CLIENT_ID || "Ov23liKhiAwxBVl4rkNz";
  const scope = "repo,user";

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;

  return NextResponse.redirect(authUrl);
}
