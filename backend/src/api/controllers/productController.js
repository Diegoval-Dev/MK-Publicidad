import service from '../services/productService.js';

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


export default {
    getAllProducts,
    getAllProductsByMaterial,
};


