const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

//List
app.get('/projects', (request, response) => {
  const { title } = request.query;

  //Filtro para checar se o usuário escreveu algo para buscar ou deixou em branco
  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects;

  return response.json(results);
});

//Create
app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

//Update
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  //Confere se o ID do projeto no array é igual o do request
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'});
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

//Delete
app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'});
  }

  projects.splice(projectIndex, 1);

  return response.status(204).json();
});

app.listen(3333, () => {
  console.log('🚀Back-end started!');
});