CREATE TABLE IF NOT EXISTS pets (
    pet_id                   VARCHAR(36) NOT NULL,
    name                     VARCHAR(100) NOT NULL,
    status                   VARCHAR(255) NOT NULL,
    height                   INT(100) NOT NULL,
    weight                   INT(100) NOT NULL,
    color                    VARCHAR(15) NOT NULL,
    hypoallergenic           BOOLEAN NOT NULL,
    type                     VARCHAR(15) NOT NULL,
    breed                    VARCHAR(25) NOT NULL,
    bio                      VARCHAR(500) NOT NULL,
    diet                     VARCHAR(250) NOT NULL,
    image                    VARCHAR(500) NOT NULL,
    PRIMARY KEY (pet_id)
)