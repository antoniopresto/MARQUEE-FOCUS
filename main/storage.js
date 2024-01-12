"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const mongo_1 = require("@powership/mongo");
const powership_1 = require("powership");
const client = new mongo_1.MongoClient('mongodb://localhost:27017/');
exports.transporter = new mongo_1.MongoTransporter({
    collection: 'gifted',
    client,
});
(0, powership_1.setDefaultTransporter)(exports.transporter);
