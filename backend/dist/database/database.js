"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    mongoose_1.default
        //@ts-ignore
        .connect(process.env.URI)
        .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
        .catch((error) => {
        console.log("Error connecting to database");
        console.log(error);
    });
};
exports.default = connectDatabase;
