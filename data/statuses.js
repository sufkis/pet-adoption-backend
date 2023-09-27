const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

const createStatus = (userId, petId, status) => {
    return query(SQL`INSERT INTO statuses (user_id, pet_id, status) VALUES (${userId}, ${petId}, ${status})`);
}
exports.createStatus = createStatus;

const getStatusesByUserId = (userId) => {
    return query(SQL`SELECT * FROM statuses JOIN pets ON statuses.pet_id = pets.pet_id WHERE statuses.user_id = ${userId}`);
}
exports.getStatusesByUserId = getStatusesByUserId;

const getStatusByUserAndPetId = (userId, petId) => {
    return query(SQL`SELECT * FROM statuses WHERE user_id = ${userId} && pet_id = ${petId}`);
}
exports.getStatusByUserAndPetId = getStatusByUserAndPetId;

const updateStatus = (userId, petId, status) => {
    return query(SQL`UPDATE statuses SET status = ${status} WHERE user_id = ${userId} && pet_id = ${petId}`);
}
exports.updateStatus = updateStatus;

const deleteStatus = (userId, petId) => {
    return query(SQL`DELETE from statuses WHERE user_id = ${userId} && pet_id = ${petId}`);
}
exports.deleteStatus = deleteStatus;