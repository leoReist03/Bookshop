const pool = require('../dbAccessController').pool;
const { v4: uuidv4 } = require('uuid');

async function create(cover, name, description, pages, release, authorId, genreId) {
    const result = await pool.query(`
        insert into Books (cover, name, description, pages, release, authorId, genreId)
        values (?, ?, ?, ?, ?, ?, ?, ?)
        `, [uuidv4()], [cover], [name], [description], [pages], [release], [authorId], [genreId]);
    return result;
}

async function read() {
    const [rows] = await pool.query('select * from Books');
    return rows;
}

async function find(id) {
    const [rows] = await pool.query(`
        select * from Books
        where Id = ?
        `, [id]);
    return rows[0];
}

async function update(id, cover, name, description, pages, release, authorId, genreId) {
    const result = await pool.query(`
        update Books
        SET cover = ?, name = ?, description = ?`)
}

async function deleteObj() {

}

async function pages() {
    
}

module.exports = { create, read, find, update, deleteObj, pages };