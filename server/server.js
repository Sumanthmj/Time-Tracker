const jsonServer = require('json-server');
const middleWare = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleWare);
server.use(jsonServer.bodyParser);

const userData = require('../server/data/tasks');

server.get('/api/tasks', (req, res, next) => {
    res.status(200).send(userData.getTasks);
})

server.post('/api/tasks', (req, res, next) => {
    const task = userData.addTasks(req.body);
    res.status(200).send(task);
})

server.put('/api/tasks', (req, res, next) => {
    const task = userData.updateTask(req.body);
    res.status(200).send(task);
})

server.delete('/api/tasks', (req, res, next) => {
    const params = req.query;
    userData.deleteTask(params.id);
    res.status(200).send(params);
})

server.listen(3000, () => {
    console.log('Json server listening on port 3000');
})