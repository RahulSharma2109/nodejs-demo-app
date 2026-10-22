const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("./app");

async function withServer(t, callback) {
  const server = createServer();

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  t.after(() => new Promise((resolve, reject) => {
    server.close((err) => err ? reject(err) : resolve());
  }));

  const address = server.address();
  await callback(`http://127.0.0.1:${address.port}`);
}

test("GET / returns the welcome message", async (t) => {
  await withServer(t, async (url) => {
    const response = await fetch(url + "/");
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.application, "nodejs-demo-app");
    assert.equal(body.message, "Hello from Node.js CI/CD!");
  });
});

test("GET /health returns healthy status", async (t) => {
  await withServer(t, async (url) => {
    const response = await fetch(url + "/health");
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "healthy");
  });
});

test("Unknown routes return 404", async (t) => {
  await withServer(t, async (url) => {
    const response = await fetch(url + "/unknown");
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.error, "Not Found");
  });
});