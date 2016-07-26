var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    //return sequelize.define('user', {
    var user = sequelize.define('user', {

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [7, 100]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);
                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
            hooks: {
                beforeValidate: function (user, options) {
                    if (typeof (user.email) === 'string') {
                        user.email = user.email.toLowerCase();
                    }
                }
            },
            classMethods: {
                authenticate: function (body) {
                    return new Promise(function (resolve, reject) {
                        user.findOne({
                            where: {
                                email: body.email
                            }
                        }).then(function (user) {
                            if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                return reject();
                            }
                            return resolve(user);
                        }, function (e) {
                            return reject();
                        });
                    });
                },
                findByToken: function (token) {
                    return new Promise(function (resolve, reject) {
                        try {
                            var secretKey = '#abc@181$';
                            var jwtKey = '#xyz@159$';
                            var decodedJWT = jwt.verify(token, jwtKey);
                            var bytes = cryptojs.AES.decrypt(decodedJWT.token, secretKey);
                            var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
                            user.findById(tokenData.id).then(function (user) {
                                if (user) {
                                    resolve(user);
                                } else {
                                    reject();
                                }
                            }, function (e) {
                                reject();
                            });
                        } catch (e) {
                            reject();
                        }
                    });
                }
            },
            instanceMethods: {
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
                },
                generateToken: function (type) {
                    if (!_.isString(type)) {
                        return undefined;
                    }

                    try {
                        var stringData = JSON.stringify({ id: this.get('id'), type: type });
                        var secretKey = '#abc@181$';
                        var encryptedData = cryptojs.AES.encrypt(stringData, secretKey).toString();
                        var jwtKey = '#xyz@159$';
                        var token = jwt.sign({
                            token: encryptedData,
                        }, jwtKey);
                        return token;
                    } catch (e) {
                        return undefined;
                    }
                }
            }
        });

    return user;
};