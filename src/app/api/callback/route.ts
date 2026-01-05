import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID || "Ov23liKhiAwxBVl4rkNz",
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      console.error("GitHub OAuth Error:", data);
      return NextResponse.json(data, { status: 400 });
    }

    const responseData = {
      token: data.access_token,
      provider: "github",
    };

    const script = `
      <!DOCTYPE html>
      <html>
      <body>
        <script>
          (function() {
            const responseData = ${JSON.stringify(responseData)};
            const message = "authorization:github:success:" + JSON.stringify(responseData);
            window.opener.postMessage("authorizing:github", "*");
            window.opener.postMessage(message, window.opener.location.origin);
          })();
        </script>
      </body>
      </html>
    `;

    return new NextResponse(script, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
