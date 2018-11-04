const noteDao = require('../DAOs/note.dao');

module.exports = {
    all: () => {
        return noteDao.all();
    },

    create: (note, person_id) => {
        return noteDao.create(note, person_id);
    },

    get: (person_id) => {
        return noteDao.get(person_id);
    },

    getOne: (id, person_id) => {
        return noteDao.getOne(id, person_id);
    },

    edit: (note, person_id) => {
        return noteDao.edit(note, person_id);
    },

    delete: (id, person_id) => {
        return noteDao.delete(id, person_id);
    }
}