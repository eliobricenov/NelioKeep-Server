const db = require('../utils/db');
const utils = require('../utils/util');
module.exports = {

    /** 
     * Searchs for the information of all the notes in the database.
     * @author ebriceno
     * @returns JSON with the information of the registered notes.
     */
    all: async () => {
        const data = await db.any('SELECT * FROM note');
        return data.length > 0 ? data : [];
    },

    /**
     * Inserts a new person in the database.
     * @author ebriceno 
     * @param person JSON with the information of the account to create.
     * @returns JSON with the information of the registered person.
     * @throws A new error if the email is already registered in the database.
     */
    create: (note, person_id) => {
        return db.one(`INSERT INTO note (title, content, person_id)
                    VALUES ($1, $2, $3) RETURNING id, title, content, person_id`,
            [note.title, note.content, person_id]);
    },

    /**
     * @author ebriceno
     * @description Searchs for the information of the person with the provided address. 
     * @param email Email of the account.
     * @returns Information from of the person with the provided email address.
     * @throws A new error if email is not registered in the database.
     */
    getOne: (id, person_id) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one(`SELECT count(id) FROM note WHERE note.id = $1
                AND note.person_id = $2`, [id, person_id]);
            if (count.count > 0) {
                return t.one(`SELECT * FROM note WHERE note.id = $1 AND note.person_id = $2`, [id, person_id]);
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no note with the provided id was found'
                    }]
                }
            }
        })
    },

    get: (personId) => {
        return db.task(async t => {
            const data = await t.any(`SELECT n.id note_id, n.title note_title, 
                n.content note_content, i.id image_id, i.url image_url FROM note n 
                JOIN image i ON n.id = i.note_id WHERE n.person_id = $1`, [personId]);
            const notes = data.length > 0 ? data : [];
            return utils.arrange(notes, "note_id", "images", ["image_id","image_url"]);
        })
    },

    /**
     * @author ebriceno
     * @description Searchs for the information of the person with the provided address. 
     * @param email Email of the account.
     * @returns Information from of the person with the provided email address.
     * @throws A new error if email is not registered in the database.
     */
    edit: (note, person_id) => {
        console.log(note, person_id);
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one(`SELECT count(id) FROM note WHERE note.id = $1 
                AND note.person_id = $2`, [note.id, person_id]);
            if (count.count > 0) {
                return t.one(`UPDATE note SET title = $1, content = $2 WHERE note.id = $3
                    RETURNING id, title, content, person_id`, [note.title, note.content, note.id]);
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no note with the provided id was found'
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
    delete: (id, person_id) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one(`SELECT count(id) FROM note WHERE note.id = $1 
                AND note.person_id = $2`, [id, person_id]);
            if (count.count > 0) {
                const result = await t.result(`DELETE FROM note WHERE note.id = $1 
                    AND note.person_id = $2`, [id, person_id]);
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