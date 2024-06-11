const http = require("http");
const url = require("url");

const HOST = "localhost";
const PORT = 5000;

function factorial(n, callback) {
  process.nextTick(() => {
    if (n === 0 || n === 1) {
      callback(null, 1);
    } else {
      factorial(n - 1, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, n * result);
        }
      });
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Проверка наличия параметра k в запросе
  if (pathname === "/fact" && query.k) {
    const k = parseInt(query.k);

    // Проверка на корректность значения k
    if (!isNaN(k) && k >= 0) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      console.time("factorial_time");
      factorial(k, (err, result) => {
        console.timeEnd("factorial_time");
        if (err) {
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.end(JSON.stringify({ k: k, factorial: result }));
        }
      });
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Parameter k must be a non-negative integer.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(
      "Invalid endpoint. Use /fact?k=n where n is a non-negative integer."
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server is working on port: ${PORT}`);
});
