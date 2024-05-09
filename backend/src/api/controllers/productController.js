import productService from '../services/productService.js';


const createProduct = async (req, res) => {
    console.log("ENTRO Al controller");
    try {
        const { name, category, material, description, size, color, technique } = req.body;

        // Verifica si hay un archivo de imagen cargado
        console.log("Req Body:", req.body);
        console.log("Req File:", req.file);
        let image = null;
        if (req.file) {
            image = req.file.path;
            console.log("File path:", image);
        } else {
            console.log("File not uploaded.");
        }
        const product = { name, category, material, description, image, size, color, technique };

        const newProduct = await productService.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const { name, material, category } = req.query;
        const filters = { name, material, category };
        const products = await productService.getProducts(filters);
        res.status(200).json({
            status: 'OK',
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, category, material, description, image } = req.body;
        const updatedProduct = await productService.updateProduct(id, { name, category, material, description, image });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.deleteProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFilterOptionsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const filters = await productService.getFilterOptionsByCategory(category);

        res.status(200).json(filters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFilterOptionsByCategory

};
