import { createType } from 'powership';

export const NoteType = createType({
  object: {
    title: { string: {} },
    body: { string: {}, defaultValue: '' },
  },
});
