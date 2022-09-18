const ansiColors = require(global.__approot + "/constants/ansi-esc-color-constants.js");
const mongoose = require("mongoose");

const databaseConfig = (connectionUri) => {
    return mongoose
        .connect(connectionUri)
        .then(() => console.info(`${ansiColors.green}[app] Database connection successful`))
};

module.exports = databaseConfig;
