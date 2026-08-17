const FILE_KEY = "galato_kabe_v2.0.zip";
const DOWNLOAD_NAME = "galato_kabe_v2.0.zip";

export async function onRequest(context) {
  if (context.request.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Allow": "GET",
        "Cache-Control": "no-store",
      },
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
  headers.set("Content-Type", "application/zip");

  if (object.httpEtag) {
    headers.set("ETag", object.httpEtag);
  }

  return new Response(object.body, { headers });
}
