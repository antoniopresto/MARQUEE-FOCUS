import { createType } from 'powership';

export const NoteType = createType('Note', {
  object: {
    uid: 'string',
    body: { string: {}, defaultValue: '' },
    category: { string: {}, defaultValue: 'Notes' },
  },
});
