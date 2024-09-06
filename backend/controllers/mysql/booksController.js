const pool = require('../dbAccessController').pool;
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

async function read(query) {
    const [rows] = await pool.query(`
        SELECT b.Id, b.Cover, b.Name, b.Description, b.Pages, b.ReleaseDate, a.Name AS Author, g.Name AS Genre FROM Books as b
        JOIN Authors AS a ON b.AuthorId = a.Id
        JOIN Genres AS g ON b.GenreId = g.Id
        WHERE b.Name LIKE ?
        `, `%${[query]}%`);

    result = rows.map(row => {
        return author = {
            Id: row.Id,
            Cover: row.Cover,
            Name: row.Name,
            Description: row.Description,
            Pages: row.Pages,
            ReleaseDate: row.ReleaseDate.toISOString().split('T')[0],
            AuthorId: row.AuthorId,
            GenreId: row.GenreId
        }
    });

    return result;
}

async function find(id) {
    const [rows] = await pool.query(`
        SELECT Id, Cover, Name, Description, Pages, ReleaseDate, AuthorId AS Author, GenreId AS Genre FROM Books
        WHERE Id = ?
        `, [id]);

    result = rows.map(row => {
        return author = {
            Id: row.Id,
            Cover: row.Cover,
            Name: row.Name,
            Description: row.Description,
            Pages: row.Pages,
            ReleaseDate: row.ReleaseDate.toISOString().split('T')[0],
            Author: row.Author,
            Genre: row.Genre
        }
    });

    return result[0];
}

async function pages() {
    const result = await pool.query(`
        SELECT COUNT(*) AS count FROM Books`);
    return [result[0][0].count];
}

async function create(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return { status: 400, message: 'Failed to create Book because of validation errors:', error: errors.array()}
    }

    const { cover, name, description, pages, releaseDate, authorId, genreId} = req.body;

    try {
        const bookId = uuidv4();
        const result = await pool.query(`
            INSERT INTO Books (Id, Cover, Name, Description, Pages, ReleaseDate, AuthorId, GenreId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [bookId, cover, name, description, pages, releaseDate, authorId, genreId]);

        return { status: 201, message: 'Book created successfully', bookId: bookId, affectedRows: result.affectedRows }
    } catch (error) {
        console.error('Database error:', error);
        return { status: 500, message: 'Failed to create Book', error: error };
    }
}

async function update(req) {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return { status: 400, message: 'Failed to update Book because of validation errors:', error: errors.array()}
    }

    const { id, cover, name, description, pages, releaseDate, authorId, genreId} = req.body;

    try {
        const bookId = uuidv4();
        const result = await pool.query(`
            UPDATE Books
            SET Cover = ?, Name = ?, Description = ?, Pages = ?, ReleaseDate = ?, AuthorId = ?, GenreId = ?
            WHERE Id = ?
        `, [cover, name, description, pages, releaseDate, authorId, genreId, id]);

        return { status: 201, message: 'Book updated successfully', bookId: bookId, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Database error:', error);
        return { status: 500, message: 'Failed to update Book', error: error };
    }
}

async function deleteObj(req) {
    const { id } = req.body;

    try {
        const result = await pool.query(`
            DELETE FROM Books
            WHERE Id = ?
        `, [id]);

        return { status: 201, message: 'Book deleted successfully', bookId: id, affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Database error', error);
        return {status: 500, message: 'Failed to delete Book', error: error };
    }
}

module.exports = { create, read, find, update, deleteObj, pages };