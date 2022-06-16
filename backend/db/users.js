const knex = require("./knex");

// http://knexjs.org/guide/query-builder.html#identifier-syntax

function createUser(user) {
    // bcrypt password for security
    return knex("users").insert(user);
}

function getAllUsers() {
    return knex("users").select("*");
}

function deleteUser(id) {
    return knex("users").where("id", id).del();
}

function updateUser(user) {
    return knex().where("id", id).update(user);
}

function login(user) {
    console.log("user", user);
    let username = user.username;
    let password = user.password;

    // username not blank
    if(username.length > 0) {
        return knex('users').where({
            username: username,
            password:  password //bcrypt compare
          }).select('id');
    }else{
	return 0;
    }
}

module.exports = {
    login,
    createUser,
    getAllUsers,
    deleteUser,
    updateUser
}
