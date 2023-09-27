const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

const createPet = (petId, name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, image) => {
    return query(SQL`INSERT INTO pets (pet_id, name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, image) VALUES (${petId}, ${name}, ${status}, ${height}, ${weight}, ${color}, ${hypoallergenic}, ${type}, ${breed}, ${bio}, ${diet}, ${image})`);
}
exports.createPet = createPet;

const getAllPets = () => {
    return query(SQL`SELECT * from pets`);
}
exports.getAllPets = getAllPets;

const getPetById = async (petId) => {
    const rows = await query(SQL`SELECT * from pets WHERE pet_id = ${petId}`);
    return rows[0];
}
exports.getPetById = getPetById;

const getPetsByType = (type) => {
    return query(SQL`SELECT * from pets WHERE type = ${type}`);
}
exports.getPetsByType = getPetsByType;

const getPetsBySearch = (searchObj) => {
    const searchQ = SQL`SELECT pet_id, name, status, image FROM pets `;
    if (!Object.entries(searchObj).length) return query(searchQ);
    searchQ.append(SQL`WHERE `);
    const conditionsArray = [];
    Object.entries(searchObj).forEach(param => {
        const tempQ = SQL``;
        tempQ.append(SQL`${param[0]} = `, { unsafe: true });
        tempQ.append(SQL`${param[1]}`);
        conditionsArray.push(tempQ);
    });
    searchQ.append(searchQ.glue(conditionsArray, ' && '))
    return query(searchQ);
}
exports.getPetsBySearch = getPetsBySearch;

const updatePet = (petId, name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, image) => {
    return query(SQL`UPDATE pets SET name = ${name}, status = ${status}, height = ${height}, weight = ${weight}, color = ${color}, hypoallergenic = ${hypoallergenic}, type = ${type}, breed = ${breed}, bio = ${bio}, diet = ${diet}, image = ${image} WHERE pet_id = ${petId}`);
}
exports.updatePet = updatePet;

const updatePetStatus = (petId, status) => {
    return query(SQL`UPDATE pets SET status = ${status} WHERE pet_id = ${petId}`);
}
exports.updatePetStatus = updatePetStatus;

