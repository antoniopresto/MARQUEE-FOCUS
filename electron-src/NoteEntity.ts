import { createEntity } from 'powership';
import { transporter } from './storage';
import { NoteType } from './Note';

export const NoteEntity = createEntity({
  name: 'Note',
  type: NoteType,
  indexes: [
    {
      //
      name: 'PK',
      PK: ['.uid'],
    },{
      //
      name: 'SK',
      PK: ['.category'],
    },
  ],
  transporter,
});
