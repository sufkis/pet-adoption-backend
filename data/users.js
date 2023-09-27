const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

const createUser = (userId, email, passwordHash, firstName, lastName, phone, bio = '' ) => {
    return query(SQL`INSERT INTO users (user_id, email, password_hash, first_name, last_name, phone, bio) VALUES (${userId}, ${email}, ${passwordHash}, ${firstName}, ${lastName}, ${phone}, ${bio})`);
}
exports.createUser = createUser;

const updateUser = (userId, email, firstName, lastName, phone, bio = '' ) => {
    return query(SQL`UPDATE users SET email = ${email}, first_name = ${firstName}, last_name = ${lastName}, phone = ${phone}, bio = ${bio} WHERE user_id = ${userId}`);
}
exports.updateUser = updateUser;

const updateUserPassword = (userId, passwordHash) => {
    return query(SQL`UPDATE users SET password_hash = ${passwordHash} WHERE user_id = ${userId}`);
}
exports.updateUserPassword = updateUserPassword;

const getAllUser = async () => {
    const rows = await query(SQL`SELECT user_id AS id, email, first_name AS firstName, last_name AS lastName, phone, bio, role FROM users`);
    return rows;
}
exports.getAllUser = getAllUser;

const getUserPasswordById = async (userId) => {
    const rows = await query(SQL`SELECT * FROM users WHERE user_id=${userId}`);
    return rows[0];
}
exports.getUserPasswordById = getUserPasswordById;

const getUserById = async (userId) => {
    const rows = await query(SQL`SELECT user_id AS id, email, first_name AS firstName, last_name AS lastName, phone, bio FROM users WHERE user_id=${userId}`);
    return rows[0];
}
exports.getUserById = getUserById;

const getUserByEmail = async (email) => {
    const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
    return rows[0];
}
exports.getUserByEmail = getUserByEmail;
