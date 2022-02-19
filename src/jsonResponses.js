const users = {};
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
    responseJSON.message = 'Both name and age are required.';
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
    message: 'Requires both name and age.',
  };
  if (!body.age || !body.name) {
    responseJSON.message = 'Missing parameters.';
    return respondJSON(request, response, 400, responseJSON);
  }
  let responseCode = 204;
  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }
  users[body.name].name = body.name;
  users[body.name].age = body.age;
  if (responseCode === 201) {
    responseJSON.message = 'Successfully created user.';
    return respondJSON(request, response, 201, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  respondJSON(request, response, 200, responseJSON);
};
const deleteUsers = (request, response) => {
  const responseJSON = {
    message: 'Users deleted.',
  };
  users = {};
  if (responseCode === 201) {
    responseJSON.message = 'Successfully deleted users.';
    return respondJSON(request, response, 201, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};
module.exports = {
  success,
  badRequest,
  notFound,
  getUsers,
  makeSnowman,
  deleteUsers
};
