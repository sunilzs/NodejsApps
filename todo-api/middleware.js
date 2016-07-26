module.exports = function (db) {
    return {
        requireAuthentication: function (req, res, next) {
            console.log('requireAuthentication');
            var token = req.get('Auth');
            db.user.findByToken(token).then(function (user) {
                req.user = user;
                console.log('Success');
                next();
            }, function (e) {
                res.status(401).send();
            });
        }
    };
}