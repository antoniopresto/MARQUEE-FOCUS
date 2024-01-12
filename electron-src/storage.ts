import { MongoClient, MongoTransporter } from '@powership/mongo';
import { setDefaultTransporter } from 'powership';

const client = new MongoClient('mongodb://localhost:27017/');

export const transporter = new MongoTransporter({
  collection: 'gifted',
  client,
});

setDefaultTransporter(transporter);
