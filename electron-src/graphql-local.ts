import { createGraphQLHandlers, createResolver, Server } from 'powership';
import { NoteEntity } from './NoteEntity';

const createNote = createResolver({
  name: 'createNote',
  type: NoteEntity.type.optionalType(),
  args: NoteEntity.inputType.clone((el) => el.def()),
  async resolve(_, args, context) {
    const res = await NoteEntity.createOne({ context, item: args });
    return res.item;
  },
});

const getNote = createResolver({
  name: 'getNote',
  type: NoteEntity.type.optionalType(),
  args: NoteEntity.findOne.queryArgs,
  async resolve(_, args, context) {
    const res = await NoteEntity.findOne({ context, ...args });
    return res.item;
  },
});

export const graphqlHandlers = createGraphQLHandlers({
  resolvers: {
    createNote,
    getNote,
  },
});

export const server = new Server({ handlers: graphqlHandlers });

const PORT = 3051;

server
  .start(PORT)
  .then((res) => {
    console.log(`http://localhost:${res.port}`);
  })
  .catch(console.error);
