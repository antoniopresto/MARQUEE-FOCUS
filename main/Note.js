"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteType = void 0;
const powership_1 = require("powership");
exports.NoteType = (0, powership_1.createType)('Note', {
    object: {
        uid: 'string',
        body: { string: {}, defaultValue: '' },
        category: { string: {}, defaultValue: 'Notes' },
    },
});
