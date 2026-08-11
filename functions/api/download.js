const FILE_KEY = "galato_kabe_v2.0.zip";
const DOWNLOAD_NAME = "galato_kabe_v2.0.zip";

// 2026-08-16 23:59:59 JST
const DOWNLOAD_DEADLINE = Date.UTC(2026, 7, 16, 14, 59, 59);

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

  if (Date.now() > DOWNLOAD_DEADLINE) {
    return new Response("このダウンロードは終了しました。", {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
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
