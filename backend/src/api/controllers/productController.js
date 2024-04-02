import service from '../services/productService.js';


const createProduct = async (req, res) => {
    try {
        const name = req.body.name;
        const category = req.body.category;
        const material = req.body.material;
        const description = req.body.description;
        const image = req.body.image;
        const product = { name, category, material, description, image };
        const newProduct = await service.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await service.getProducts();
        console.log(products)
        const response = {
            status: 'OK',
            data: products,
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProductsByMaterial = async (req, res) => {
    try {
        const material = req.params.material; 
        const products = await service.getProductsByMaterial(material);
        
        const response = {
            status: 'OK',
            data: products,
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProductsByName = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await productService.getProductsByName(name);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const products = await productService.getProductsByCategory(category);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export default {
    getAllProducts,
    getAllProductsByMaterial,
    getAllProductsByCategory,
    getAllProductsByName,
    createProduct,
};


