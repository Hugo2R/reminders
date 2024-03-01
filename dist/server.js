Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const base = "./dist/";
    console.log(base, path)

    if (path === "/") {
      return new Response(Bun.file(base + "index.html"));
    }

    const file = Bun.file(base + path);
    return new Response(file);
  },
  port: 3000,
  error() {
    return new Response(null, { status: 404 });
  },
});

//console.log(`Listening on http://localhost:${server.port} ...`);
