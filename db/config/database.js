import config from 'config';

export default {
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  dialect: config.get('db.dialect'),
  seederStorage: config.get('db.seederStorage'),
  seederStorageTableName: config.get('db.seederStorageTableName'),
  migrationStorageTableName: config.get('db.migrationStorageTableName'),
};
