"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.graphqlHandlers = void 0;
const powership_1 = require("powership");
const NoteEntity_1 = require("./NoteEntity");
const createNote = (0, powership_1.createResolver)({
    name: 'createNote',
    type: NoteEntity_1.NoteEntity.type.optionalType(),
    args: NoteEntity_1.NoteEntity.inputType.clone((el) => el.def()),
    async resolve(_, args, context) {
        const res = await NoteEntity_1.NoteEntity.createOne({ context, item: args });
        return res.item;
    },
});
const getNote = (0, powership_1.createResolver)({
    name: 'getNote',
    type: NoteEntity_1.NoteEntity.type.optionalType(),
    args: NoteEntity_1.NoteEntity.findOne.queryArgs,
    async resolve(_, args, context) {
        const res = await NoteEntity_1.NoteEntity.findOne({ context, ...args });
        return res.item;
    },
});
exports.graphqlHandlers = (0, powership_1.createGraphQLHandlers)({
    resolvers: {
        createNote,
        getNote,
    },
});
exports.server = new powership_1.Server({ handlers: exports.graphqlHandlers });
const PORT = 3051;
exports.server
    .start(PORT)
    .then((res) => {
    console.log(`http://localhost:${res.port}`);
})
    .catch(console.error);
