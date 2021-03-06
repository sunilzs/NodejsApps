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
//GET /todos?completed=true&q=house
app.get('/todos', function (req, res) {
    var queryParams = req.query;
    var filteredTodos = todos;

    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        filteredTodos = _.where(filteredTodos, { completed: true });
    } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        filteredTodos = _.where(filteredTodos, { completed: false });
    }

    if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
        filteredTodos = _.filter(filteredTodos, function (todo) {
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        });
    }
    res.json(filteredTodos);

    //console.log(queryParams);


});

//GET /todos/id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos, { 'id': todoId });

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

//POST /todos
app.post('/todos', function (req, res) {
    //var body = req.body;

    //Use _.pick to only pick description and completed
    var body = _.pick(req.body, 'description', 'completed');

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }

    body.description = body.description.trim();
    console.log('todo description' + body.description);
    body.id = todoNextId++;
    todos.push(body);
    res.json(body);

});

//DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos, { 'id': todoId });

    if (!matchedTodo) {
        return res.status(404).json({ "error": "no todo found with that id" });
    }
    todos = _.without(todos, matchedTodo);
    res.json(matchedTodo);
})

//PUT /todos/:id
app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos, { 'id': todoId });
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).json({ "error": "no todo found with that id" });
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);

})

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
});
