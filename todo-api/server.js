var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('TODO Api Root ');
});

//GET /todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

//GET /todos/id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo = _.find(todos, {'id': todoId});

    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
});

//POST /todos
app.post('/todos', function (req, res) {
    //var body = req.body;

    //Use _.pick to only pick description and completed
    var body = _.pick(req.body, 'description', 'completed');

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        return res.status(400).send();
    }
    
    body.description = body.description.trim();
    console.log('todo description' + body.description);
    body.id = todoNextId++;
    todos.push(body);
    res.json(body);

});

//GET /todos/id
// app.get('/todos/:id', function (req, res) {
//     var todoId = parseInt(req.params.id);
//     var matchedTodo;

//     todos.forEach(function (todo) {
//         if(todo.id === todoId){
//             matchedTodo = todo;
//         }
//     });

//     if(matchedTodo){
//         res.json(matchedTodo);
//     }else{
//         res.status(404).send();
//     }
// });

//POST /todos
// app.post('/todos', function (req, res) {
//     var body = req.body;

//     body.id = todoNextId++;
//     todos.push(body);

//     console.log('todo description' + body.description);
//     res.json(req.body);


// });



app.listen(PORT, function () {
    console.log('Express runnning on port: ' + PORT)
})