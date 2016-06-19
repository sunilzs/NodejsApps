//Sample Promise

// function doWorkPromise(data) {
//     return new Promise(function (resolve, reject) {
//         resolve('Everything worked!');
//         reject({
//             error: 'something bad happened'
//         });
//     });
// }

// doWorkPromise('Some data').then(function (data) {
//     console.log(data);
// }, function (error) {
//     console.log(error);
// });


//Advances Promise examples
//chain multiple promise together

// function doWork(shouldFail) {
//     return new Promise(function (resolve, reject) {
//        setTimeout(function () {
//         //  console.log('done!')
//         //  resolve();
//         if(typeof(shouldFail)==='boolean' && shouldFail===true){
//             reject('error message');
//         }else{
//             resolve('success')
//         }
//        }, 1000);
//     });
// }

// doWork().then(function (message) {
//     console.log(message);
//     return doWork(true)
// }).then(function (message) {
//     console.log(message);
//     console.log('all done!')
// }).catch(function (error) {
//     console.log(error);
// });


//getWeather fucntion by chaining promises



























