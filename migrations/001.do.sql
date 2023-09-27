CREATE TABLE IF NOT EXISTS users (
    user_id            VARCHAR(36) NOT NULL,
    email              VARCHAR(100) NOT NULL,
    password_hash      VARCHAR(255) NOT NULL,
    first_name         VARCHAR(100) NOT NULL,
    last_name          VARCHAR(100) NOT NULL,
    phone              VARCHAR(15) NOT NULL,
    bio                VARCHAR(500) NOT NULL,
    PRIMARY KEY (user_id)
)