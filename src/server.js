const http = require('http');
const query = require('querystring');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const parseBody = (request, response, handler) => {
  const body = [];
  request.on('error', (err) => {
    response.statusCode = 400;
    response.end();
  });
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    handler(request, response, bodyParams);
  });
};
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/makeSnowman') {
    parseBody(request, response, jsonHandler.makeSnowman);
  }
};
const handleGet = (request, response, parsedUrl) => {
  let url=parsedUrl.pathname;
  if (url === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if(url.includes('/images')){
    htmlHandler.getImage(request,response,url);
  } else if(url.includes('/fonts')){
    htmlHandler.getFont(request,response,url);
  } else if (url === '/getSnowmen') {
    jsonHandler.getSnowmen(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
