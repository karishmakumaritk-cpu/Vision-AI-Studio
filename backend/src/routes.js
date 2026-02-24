module.exports = function (app) {
  const projects = require('./controllers/projects.controller');
  const messages = require('./controllers/messages.controller');

  // Projects
  app.get('/api/projects', projects.listProjects);
  app.post('/api/projects', projects.createProject);
  app.get('/api/projects/:id', projects.getProject);

  // Messages
  app.get('/api/messages', messages.listMessages); // ?project_id=
  app.post('/api/messages', messages.postMessage);
};
