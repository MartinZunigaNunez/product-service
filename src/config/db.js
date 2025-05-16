import dotenv from 'dotenv';
import { open } from 'sqlite'
import path from 'path'
import sqlite3 from 'sqlite3'

dotenv.config();

const dbPath = path.resolve('database.sqlite');

let db = null;

export async function getConnection(){
    if (db) return db;

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.run('PRAGMA foreign_keys = ON');

    return db;
}

/**
 * Inicializar la base de datos: crear tabla si no existe
 */
export async function initDatabase() {
    try {
      const conn = await getConnection();
  
      await conn.exec(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          stock INTEGER DEFAULT 0,
          category TEXT,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
  
      await conn.exec(`
        CREATE TRIGGER IF NOT EXISTS update_product_timestamp
        AFTER UPDATE ON products
        BEGIN
          UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
        END;
      `);
  
      console.log('Base de datos de productos inicializada ✅');
    } catch (error) {
      console.error('Error al inicializar la base de datos de productos:', error);
    }
  }