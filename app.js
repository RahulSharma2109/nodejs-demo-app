const http = require("node:http");

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.url === "/health") {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "healthy",
        application: "nodejs-demo-app"
      }));
      return;
    }

    if (req.url === "/") {
      res.writeHead(200);
      res.end(JSON.stringify({
        message: "Hello from Node.js CI/CD!",
        application: "nodejs-demo-app",
        version: "1.0.0"
      }));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;

  createServer().listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = { createServer };