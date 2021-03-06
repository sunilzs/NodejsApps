var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            //notEmpty: true
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
        // validate: {
        //     notEmpty: true
        // }
    }
});

var User = sequelize.define('user', {
    email: Sequelize.STRING
});


//Associations....

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
    // force: true 
}).then(function () {
    console.log('Everything is good!');
    
    User.findById(1).then(function(user){
        user.getTodos().then(function (todos){
            todos.forEach(function(element) {
             console.log(todo.toJSON());   
            });
        });
    });

    // User.create({
    //     email: 'sun@gmail.com'  
    // }).then(function () {
    //     return Todo.create({
    //         description: 'walk the dog'
    //     })
    // }).then(function(todo){
    //     User.findById(1).then(function (user){
    //         User.addTodo(todo);
    //     })  
    // });
});
//sequelize.sync(force: true) - to drop tables and create new
// sequelize.sync({ force: true }).then(function () {
//     console.log('Everything is good!');

//     Todo.create({
//         description: "Take out trash",
//     }).then(function (todo) {
//         // console.log('Finished!');
//         // console.log(todo);

//         return Todo.create({
//             description: ' Clean the office',
//         });
//     }).then(function () {
//         //return Todo.findById(1);
//         return Todo.findAll({
//             //completed: false
//             where: {
//                 description: {
//                     $like: '%trash%'
//                 }
//             }
//         });
//     }).then(function (todos) {
//         if (todos) {
//             todos.forEach(function (todo) {
//                 console.log();
//                 console.log(todo.toJSON());
//             });
//         } else {
//             console.log('No todo found!');
//         }
//     }).catch(function (e) {
//         console.log(e);
//     });
// });

