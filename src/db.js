import Dexie from 'dexie';

const db = new Dexie('LocalDB');

// Declare tables, IDs and indexes
db.version(1).stores({
    shifts: '++id,name, date, starttime, endtime, mintuescalctime, note, isActive',
    clients: '++id, &name',
    self: 'name'
});

export default db;