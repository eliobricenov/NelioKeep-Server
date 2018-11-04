const db = require('../utils/db');

module.exports = {

    /** 
     * Searchs for the information of all the notes in the database.
     * @author ebriceno
     * @returns JSON with the information of the registered notes.
     */
    all: async () => {
        const data = await db.any('SELECT * FROM image');
        return data.length > 0 ? data : [];
    },

    /**
     * Inserts a new person in the database.
     * @author ebriceno 
     * @param person JSON with the information of the account to create.
     * @returns JSON with the information of the registered person.
     * @throws A new error if the email is already registered in the database.
     */
    create: (image) => {
        return db.one(`INSERT INTO image (url, note_id)
                    VALUES ($1, $2) RETURNING id, url, note_id`,
            [image.url, image.note_id]);
    },

    /**
     * @author ebriceno
     * @description Searchs for the information of the person with the provided address. 
     * @param email Email of the account.
     * @returns Information from of the person with the provided email address.
     * @throws A new error if email is not registered in the database.
     */
    getOne: (id) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM image WHERE image.id = $1', [id]);
            if (count.count > 0) {
                return t.one(`SELECT * FROM image WHERE image.id = $1`, [id]);
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no image with the provided id was found'
                    }]
                }
            }
        })
    },

    /**
     * @author ebriceno
     * @description Searchs for the information of the person with the provided address. 
     * @param email Email of the account.
     * @returns Information from of the person with the provided email address.
     * @throws A new error if email is not registered in the database.
     */
    edit: (id, image) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM image WHERE image.id = $1', [id]);
            if (count.count > 0) {
                return t.one(`UPDATE image SET url = $1 WHERE image.id = $2
                    RETURNING id, url`, [image.url, id]);
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no image with the provided id was found'
                    }]
                }
            }
        })
    },

    /**
     * @author ebriceno
     * @description Searchs for the information of the person with the provided address. 
     * @param email Email of the account.
     * @returns Information from of the person with the provided email address.
     * @throws A new error if email is not registered in the database.
     */
    delete: (id) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM image WHERE image.id = $1', [id]);
            if (count.count > 0) {
                const result = await t.result(`DELETE FROM image WHERE image.id = $1`, [id]);
                return result.rowCount > 0;
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no note with the provided id was found'
                    }]
                }
            }
        })
    }
};