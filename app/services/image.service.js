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

    edit: (note) => {
        return imageDao.edit(note);
    },

    delete: (id) => {
        return imageDao.delete(id);
    }
}