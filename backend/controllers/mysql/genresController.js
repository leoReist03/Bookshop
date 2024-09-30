const pool = require('../dbAccessController').pool;
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

async function read(query) {
    const [rows] = await pool.query(`
        SELECT * FROM Genres
        WHERE Name LIKE ?`, `%${[query]}%`);
    return rows;
}

async function find(id) {
    const [rows] = await pool.query(`
        SELECT * FROM Genres
        WHERE Id = ?
    `, [id]);
    return rows[0];
}

async function pages() {
    const result = await pool.query(`
        SELECT COUNT(*) AS count FROM Genres`);
    return [result[0][0].count];
}

async function create(req) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return { status: 400, message: 'Failed to create Genre', error: errors.array() };
    }
    
    const { name } = req.body;

    try {
        const genreId = uuidv4();
        const result = await pool.query(`
            INSERT INTO Genres (Id, Name, CreatedAt, UpdatedAt)
            VALUES (?, ?, ?, ?)
        `, [genreId, name, new Date(), new Date()]);

        return { status: 201, message: 'Genre create successfully', genreId: genreId, affectedRows: result.affectedRows }
    } catch (error) {
        console.error('Database error', error);
        return { status: 500, message: 'Failed to create Genre', error: error };
    }
}

async function update(req) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return { status: 400, message: 'Failed to update Genre because of validation errors:', error: errors.array() };
    }

    const { id, name } = req.body;

    try {
        const result = await pool.query(`
            UPDATE Genres
            SET Name = ?, UpdatedAt = ?
            WHERE Id = ?
        `, [name, new Date(), id]);

        return { status: 201, message: 'Genre updated successfully', genreId: id, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Database error', error);
        return { status: 500, message: 'Failed to updated Genre', error: error };
    }
}

async function deleteObj(req) {
    const { id } = req.body;

    try {
        const result = await pool.query(`
            DELETE FROM Genres
            WHERE Id = ?
        `, [id]);

        return { status: 201, message: 'Genre deleted successfully', genreId: id, affectedRows: result.affectedRows }
    } catch (error) {
        console.error('Database error', error);
        return { status: 500, message: 'Failed to delete Genre', error: error };
    }
}

module.exports = { create, read, find, update, deleteObj, pages };