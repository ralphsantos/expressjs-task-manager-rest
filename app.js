// dotenv
require("dotenv").config();

// path
const path = require("path");
global.__approot = path.resolve(__dirname);

// express
const express = require("express");
const app = express();

// ansi escape colors
const ansiColors = require(__dirname + "/constants/ansi-esc-color-constants.js");

// configs
const databaseConfig = require(__dirname + "/config/database.js");

// routes
const taskRoutes = require(__dirname + "/routes/task-routes.js");

const AppInstance = () => {
    const construct = async () => {
        try {
            await databaseConfig(process.env.MONGODB_URI);
            initMiddlewares();
            initRoutes();
            initPort();
        } catch (error) {
            console.error(
                `${ansiColors.red}[app] App configuration initialization failed:`,
                error
            );
        }
    };

    const initMiddlewares = () => {
        app.use(express.json());
    };

    const initRoutes = () => {
        app.use("/api/v1/tasks", taskRoutes);
    };

    const initPort = () => {
        app.listen(
            process.env.APP_PORT,
            console.info(`${ansiColors.green}[32m[app] App listening on port ${process.env.APP_PORT}`)
        );
    };

    return construct();
};

AppInstance();
