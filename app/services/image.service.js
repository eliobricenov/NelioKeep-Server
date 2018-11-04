const imageDao = require('../DAOs/image.dao');

module.exports = {
    all: () => {
        return imageDao.all();
    },

    create: (note) => {
        return imageDao.create(note);
    },

    getOne: (id) => {
        return imageDao.getOne(id);
    },

    edit: (id, note) => {
        return imageDao.edit(id, note);
    },

    delete: (id) => {
        return imageDao.delete(id);
    }
}