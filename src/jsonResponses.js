const snowmen = {};
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};
const success = (request, response) => {
  const responseJSON = {
    message: 'A successful response!',
  };
  respondJSON(request, response, 200, responseJSON);
};
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'A successful response!',
  };
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Both hat and nose are required.';
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};
const notFound = (request, response) => {
  const responseJSON = {
    message: "Couldn't find the page you were looking for.",
  };
  respondJSON(request, response, 404, responseJSON);
};
const makeSnowman = (request, response, body) => {
  const responseJSON = {
    message: 'Your snowman needs a name.',
  };
  if (!body.name) {
    return respondJSON(request, response, 400, responseJSON);
  }
  let responseCode = 204;
  if (!snowmen[body.name]) {
    responseCode = 201;
    snowmen[body.name] = {};
  }
  snowmen[body.name].hat = body.hat;
  snowmen[body.name].eye = body.eye;
  snowmen[body.name].nose = body.nose;
  snowmen[body.name].arm = body.arm;
  if (responseCode === 201) {
    responseJSON.message = 'Successfully created snowman.';
    return respondJSON(request, response, 201, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};
const getUsers = (request, response) => {
  const responseJSON = {
    snowmen,
  };
  respondJSON(request, response, 200, responseJSON);
};
module.exports = {
  success,
  badRequest,
  notFound,
  getUsers,
  makeSnowman,
};
