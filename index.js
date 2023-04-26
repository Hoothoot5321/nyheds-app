import express from "express";

import * as fs from "fs";

const app = express();
const port = 3000;

let pa = process.cwd();

let temp_routes = fs.readdirSync(pa + "/pages");
let routes = {};
for (let i = 0; i < temp_routes.length; i++) {
  if (temp_routes[i] == "404.html" || temp_routes[i] == "index.html") {
  } else {
    routes[temp_routes[i].split(".")[0]] = temp_routes[i];
  }
}

app.get("/", (req, res) => {
  fs.readFile(pa + "/pages/index.html", "utf8", (err, data) => {
    let html = data;
    html = html.replace("@title", "sui");
    html = html.replace("@alert", "This is good lol");
    html = html.replace("@colour", "red");
    res.end(html);
  });
  //   res.sendFile(pa + "/pages/index.html");
});

app.get("/:title", (req, res) => {
  let title = req.params;

  if (routes[title.title] == undefined) {
    res.sendFile(pa + "/pages/404.html");
  } else {
    res.sendFile(pa + "/pages/" + routes[title.title]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
