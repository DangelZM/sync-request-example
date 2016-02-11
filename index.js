var Promise = require('bluebird');
var request = require('request');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var apiUrl = 'http://api.vk.com/method/';

var Users = async (function () {
    var friends = await(getFriends(9604456));
    var user1 = await(getUser(friends[0]));
    var user2 = await(getUser(friends[1]));
    return [user1, user2];
});

Users().then(function (users) {
    console.log(users);
}).catch(function (e) {
    console.log(e);
});

function apiRequest(options) {
    return new Promise(function (resolve, reject){
        request.get(options, function (error, response, body) {
            if (error) { return reject(error); }
            if (response.statusCode === 200 && body) {
                resolve(JSON.parse(body).response);
            }
        });
    });
}

function getFriends(uid){
    return apiRequest({
        url: apiUrl + 'friends.get',
        qs: {
            user_id: uid,
            count: 2,
            order: 'hints'
        }
    });
}

function getUser(uid){
    return apiRequest({
        url: apiUrl + 'users.get',
        qs: {
            user_id: uid
        }
    });
}