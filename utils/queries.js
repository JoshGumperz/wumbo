const router = require('express').Router();
const Product = require('../models/Product');

const searchQuery = async (query) => {
    try {
        let pipeline = [
            {
              '$search': {
                'index': 'searchProducts',
                'text': {
                  'query': `${query}`,
                  'path': {
                    'wildcard': '*'
                  },
                  'fuzzy': {}
                }
              }
            }
        ]
        const result = await Product.aggregate(pipeline)
        return result
    } catch (err) {
        console.log(err);       
        return res.status(500).json(err);
    }
    
}

module.exports = { searchQuery }