CREATE TABLE statuses (
    pet_id      VARCHAR(36) NOT NULL,
    user_id     VARCHAR(36) NOT NULL,
    status      VARCHAR(50) NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(pet_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
); 