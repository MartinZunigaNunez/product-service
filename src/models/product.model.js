import { getConnection } from "../config/db.js";

export async function createProduct({ name, description, price, stock, category, image_url }){
    const db = await getConnection();

    const result = await db.run(
        `INSERT INTO products (name, description, price, stock, category, image_url)
        VALUES (?, ?, ?, ?, ?, ?)`, 
        [name, description, price, stock, category, image_url]
    );

    return { id: result.lastID };
}

export async function getProductById(id){
    const db = await getConnection();

    return await db.get(`SELECT * FROM products WHERE id = ?`, [id]);
}

export async function getAllProducts({ page = 1, limit = 10, search = '', category = '' }) {
    const db = await getConnection();
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM products WHERE 1=1`;
    const params = [];

    if (search) {
        query += ' AND name LIKE ?';
        params.push(`%${search}%`);
    }

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const products = await db.all(query, params);
    return products;
}

export async function countProducts({ search = '', category = '' }) {
    const db = await getConnection();

    let query = `SELECT COUNT(*) as total FROM products WHERE 1=1`;
    const params = [];

    if (search) {
        query += ' AND name LIKE ?';
        params.push(`%${search}%`);
    }

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    const result = await db.get(query, params);
    return result.total;
}