const http = require("http");
const url = require("url");

const HOST = "localhost";
const PORT = 5000;

function factorial(n) {
  return new Promise((resolve, reject) => {

    process.nextTick(() => {
      
      if (n === 0 || n === 1) {
        resolve(1);
      } else {
        factorial(n - 1)
          .then((result) => resolve(n * result))
          .catch((err) => reject(err));
      }
    });
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
      let start = process.hrtime();

      let promises = [];
      for (let i = k; i <= k + 20; i++) {
        promises.push(
          factorial(i).then((result) => {
            let time = process.hrtime(start);
            let timeToMls = time[0] * 1000 + time[1] / 1000000;
            return { k: i, fact: result, timeToMls: timeToMls };
          })
        );
      }

      Promise.all(promises)
        .then((results) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(results));
        })
        .catch((err) => {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`Error: ${err.message}`);
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
