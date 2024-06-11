const http = require("http");
const url = require("url");
const fs = require("fs").promises;
const path = require("path");
const { EventEmitter } = require("events");
const DB = require("./db");

const PORT = 5000;

const emitter = new EventEmitter();
const db = new DB();

const handleRequest = (req, res) => {
  const reqUrl = url.parse(req.url, true);
  const { pathname, query } = reqUrl;

  res.setHeader("Content-Type", "application/json");

  if (pathname === "/" && req.method === "GET") {

    fs.readFile(path.join(__dirname, "index.html"))
      .then((data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      });


  } else if (pathname === "/api/db" && req.method === "GET") {
    db.select()
      .then((data) => {
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      });


  } else if (pathname === "/api/db" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const newData = JSON.parse(body);
        const insertedData = await db.insert(newData);
        res.end(JSON.stringify(insertedData));

        emitter.emit("dataInserted", insertedData);
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Bad Request" }));
      }
    });


  } else if (pathname === "/api/db" && req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const updatedData = JSON.parse(body);
        const result = await db.update(query.id, updatedData);
        res.end(JSON.stringify(result));

        emitter.emit("dataUpdated", result);
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Bad Request" }));
      }
    });


  } else if (pathname === "/api/db" && req.method === "DELETE") {
    db.remove(query.id)
      .then((deletedData) => {
        res.end(JSON.stringify(deletedData));

        emitter.emit("dataDeleted", deletedData);
      })
      .catch((err) => {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Bad Request" }));
      });

      
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};

emitter.on("dataInserted", (insertedData) => {
  console.log("New data inserted:", insertedData);
});

emitter.on("dataUpdated", (updatedData) => {
  console.log("Data updated:", updatedData);
});

emitter.on("dataDeleted", (deletedData) => {
  console.log("Data deleted:", deletedData);
});

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
