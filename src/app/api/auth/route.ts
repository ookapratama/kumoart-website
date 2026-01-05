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

  // Detect current host to create absolute redirect_uri
  const host = request.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const redirect_uri = `${protocol}://${host}/api/callback`;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}`;

  return NextResponse.redirect(githubAuthUrl);
}
