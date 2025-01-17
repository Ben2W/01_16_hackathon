import { getGeneratedReactAppById } from "@/lib/db/queries";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const html = ({ reactApp }: { reactApp: string }) => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>React without build steps</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@remix-run/router@1.19.2/dist/router.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-router@6.26.2/dist/umd/react-router.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-router-dom@6.26.2/dist/umd/react-router-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.25.7/babel.min.js"></script>
</head>

<body>
  <div id="root"></div>

  <script type="text/babel" data-presets="env,react">
${reactApp}
  </script>
</body>

</html>`;

export async function GET(
  request: Request,
  { params }: { params: { id?: string[] } }
) {
  const { id } = params;
  console.log(id);

  const reactApp = await getGeneratedReactAppById({ id: id?.[0] as string });

  return new NextResponse(html({ reactApp: reactApp.rawReactApp }), {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
