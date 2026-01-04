import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") || "repo,user";

  const client_id = process.env.GITHUB_CLIENT_ID;

  if (!client_id) {
    return NextResponse.json(
      { error: "Missing GITHUB_CLIENT_ID" },
      { status: 500 }
    );
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;

  return NextResponse.redirect(githubAuthUrl);
}
