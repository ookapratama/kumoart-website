import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const response = await fetch(
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

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    // Decap CMS expects a postMessage with the authorization data
    const script = `
      <script>
        (function() {
          function recieveMessage(e) {
            console.log("Recieved message:", e.data);
            if (e.data !== "authorizing:github") return;
            
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(data)}',
              e.origin
            );
          }
          window.addEventListener("message", recieveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>
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
