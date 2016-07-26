var cryptojs = require('crypto-js');

module.exports = function (db) {
    return {
        requireAuthentication: function (req, res, next) {
            console.log('requireAuthentication');
            var token = req.get('Auth') || '';

            db.token.findOne({
                where: {
                    tokenHash: cryptojs.MD5(token).toString()
                }
            }).then(function (tokenInstance) {
                if (!tokenInstance) {
                    throw new Error();
                }

                req.token = tokenInstance;
                return db.user.findByToken(token);
            }).then(function (user) {
                req.user = user;
                next();
            }).catch(function () {
                res.status(401).send();
            });
            // db.user.findByToken(token).then(function (user) {
            //     req.user = user;
            //     console.log('Success');
            //     next();
            // }, function (e) {
            //     res.status(401).send();
            // });
        }
    };
}