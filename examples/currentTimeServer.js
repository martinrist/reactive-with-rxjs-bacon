/* global require */

const http = require("http");

http.createServer((req, res) => {
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.write(new Date().toISOString());
   res.end();
}).listen(9876);