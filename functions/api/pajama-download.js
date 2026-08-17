const FILE_KEY = "gelato_kabe_v1.2.unitypackage";
const DOWNLOAD_NAME = "gelato_kabe_v1.2.unitypackage";

export async function onRequest(context) {
  if (context.request.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Allow": "GET", "Cache-Control": "no-store" },
    });
  }

  const object = await context.env.DOWNLOADS.get(FILE_KEY);

  if (object === null) {
    return new Response("配布ファイルが見つかりません。", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "private, no-store");
  headers.set("Content-Disposition", `attachment; filename="${DOWNLOAD_NAME}"`);
  headers.set("Content-Type", "application/octet-stream");

  if (object.httpEtag) headers.set("ETag", object.httpEtag);

  return new Response(object.body, { headers });
}
