const http = require("http");
const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`<h1>${global.currentState}</h1>`);
});

server.listen(PORT, () => {
  console.log(`Server is working on port: ${PORT}`);
});

const states = ["exit", "norm", "stop", "test", "idle"];
global.currentState = states[1];

reader.on("line", (chunk) => {
  if (chunk.trim() === states[0]) {
    process.exit(0);
  } else if (states.includes(chunk.trim())) {
    global.currentState = chunk.trim();
    console.log(`Current state: ${global.currentState}`);
    server.emit("stateChange");
  } else {
    console.log("Unknown data");
  }
});
