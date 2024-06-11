const http = require("http");
const url = require("url");

const HOST = "localhost";
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
      //const fact = factorial(k);
      // const response = JSON.stringify({ k, fact });

      let htmlResponse = `
          <p id="results"></p>
          <script>
              let resultsList = document.getElementById('results');
              let startTime = performance.now();
              `;

      // Adding fetch requests in a loop
      for (let x = k; x < k + 20; x++) {
        htmlResponse += `
          fetch('http://${HOST}:${PORT}/fact?k=${x}')
              .then(response => response.text())
              .then(data => {
                  let elapsedTime = performance.now() - startTime;
                  let factResult = ${factorial(x)};
                  resultsList.innerHTML += '<p>${x}. Результат: ' + elapsedTime.toFixed(2) + 'ms - ${x} / ' + factResult + '</p>';
              });
      `;
      }

      htmlResponse += `
          </script>
  `;

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(htmlResponse);
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
