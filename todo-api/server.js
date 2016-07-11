var express = require('express');
var bodyParser = require('body-parser');

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
    var matchedTodo;

    todos.forEach(function (todo) {
        if(todo.id === todoId){
            matchedTodo = todo;
        }
    });

    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
});

//POST /todos
app.post('/todos', function (req, res) {
    // var body = req.body;

    // body.id = todoNextId++;
    // todos.push(body);

    // console.log('todos' + body.description);
    res.json(req.body);

    console.log(req.body);


});



app.listen(PORT, function () {
    console.log('Express runnning on port: ' + PORT)
})