import { countProducts, createProduct, getAllProducts, getProductById, getProductsByIds } from "../models/product.model.js";

export async function handleCreateProduct(req, res) {
  try {
    const { name, description, price, stock, category, image_url } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ error: "Nombre y precio son obligatorios" });
    }

    const result = await createProduct({
      name,
      description,
      price,
      stock,
      category,
      image_url,
    });
    res.status(201).json({ message: "Producto creado", id: result.id });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function handleGetProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function handleListProducts(req, res) {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;

    const products = await getAllProducts({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        category
    });

    const total = await countProducts({ search, category });
    const totalPages = Math.ceil(total / limit);

    res.json({
        page: parseInt(page),
        totalPages,
        total,
        products
    });
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
export async function handleBulkProductRequest(req, res) {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Se requiere un arreglo de IDs' });
    }

    const products = await getProductsByIds(ids);
    res.json(products);
  } catch (err) {
    console.error('Error al obtener productos por IDs:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

