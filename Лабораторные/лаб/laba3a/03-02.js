const http = require("http");
const url = require("url");

const PORT = 5000;

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Проверка наличия параметра k в запросе
  if (pathname === "/fact" && query.k) {
    const k = parseInt(query.k);

    // Проверка на корректность значения k
    if (!isNaN(k) && k >= 0) {
      const fact = factorial(k);
      const response = JSON.stringify({ k, fact });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(response);
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
