const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

const createHearty = (userId, petId) => {
    return query(SQL`INSERT INTO hearties (user_id, pet_id) VALUES (${userId}, ${petId})`);
}
exports.createHearty = createHearty;

const getHearty = (userId, petId) => {
    return query(SQL`SELECT * FROM hearties WHERE user_id = ${userId} && pet_id = ${petId}`);
}
exports.getHearty = getHearty;

const getHeartiesByUserId = (userId) => {
    return query(SQL`SELECT * FROM hearties JOIN pets ON hearties.pet_id = pets.pet_id WHERE hearties.user_id = ${userId}`);
}
exports.getHeartiesByUserId = getHeartiesByUserId;

const deleteHearty = (userId, petId) => {
    return query(SQL`DELETE from hearties WHERE user_id = ${userId} && pet_id = ${petId}`);
}
exports.deleteHearty = deleteHearty;
