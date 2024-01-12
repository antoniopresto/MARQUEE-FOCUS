"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteEntity = void 0;
const powership_1 = require("powership");
const storage_1 = require("./storage");
const Note_1 = require("./Note");
exports.NoteEntity = (0, powership_1.createEntity)({
    name: 'Note',
    type: Note_1.NoteType,
    indexes: [
        {
            //
            name: 'PK',
            PK: ['.uid'],
        }, {
            //
            name: 'SK',
            PK: ['.category'],
        },
    ],
    transporter: storage_1.transporter,
});
