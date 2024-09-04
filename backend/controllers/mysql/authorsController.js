const pool = require('../dbAccessController').pool;
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

async function read(query) {
    const [rows] = await pool.query(`
        SELECT * FROM Authors
        WHERE Name LIKE ?`, `%${[query]}%`);
        console.log(rows);
    return rows;
}

async function find(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Authors
        WHERE Id = ?
        `, [id]);
    return rows[0];
}

async function pages() {
    const result = await pool.query(`
        SELECT COUNT(*) AS count FROM Authors`);
    return [result[0][0].count];
}

async function create(req) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return { status: 400, message: 'Failed to create Author because of validation errors:', error: errors.array() };
    }

    const { name, about, dateOfBirth, picture = 'defaultAuthorPicture.jpg' } = req.body;

    try {
        const authorId = uuidv4();
        const result = await pool.query(`
            INSERT INTO Authors (Id, Name, DateOfBirth, Picture, About)
            VALUES (?, ?, ?, ?, ?)
        `, [authorId, name, dateOfBirth, picture, about]);

        return { status: 201, message: 'Author created successfully', authorId: authorId, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Database error', error);
        return { status: 500, message: 'Failed to create Author', error: error };
    }
}

async function update(req) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return { status: 400, message: 'Failed to update Author', error: errors.array() };
    }
    
    const { id, name, about, dateOfBirth, picture = 'defaultAuthorPicture.jpg' } = req.body;

    try {
        const result = await pool.query(`
            UPDATE Authors
            SET Name = ?, DateOfBirth = ?, Picture = ?, About = ?
            WHERE Id = ?
        `, [name, dateOfBirth, picture, about, id]);

        return { status: 201, message: 'Author updated successfully', authorId: id, affectedRows: result.affectedRows }
    } catch (error) {
        console.error('Database error', error);
        return { status: 500, message: 'Failed to update Author', error: error };
    }
}

async function deleteObj(req) {
    const { id } = req.body;

    try {
        const result = await pool.query(`
            DELETE FROM Authors
            WHERE Id = ?
        `, [id]);

        return { status: 201, message: 'Author deleted successfully', authorId: id, affectedRows: result.affectedRows }
    } catch (error) {
        console.error('Database error', error);
        return { status: 500, message: 'Failed to delete Author', error: error };
    }
}

module.exports = { create, read, find, update, deleteObj, pages };