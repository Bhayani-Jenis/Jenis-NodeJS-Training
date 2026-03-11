const express = require('express')
const app = express()

let products = [
    { id: 1, name: 'Laptop', category: 'tech', price: 999 },
    { id: 2, name: 'Phone', category: 'tech', price: 499 },
    { id: 3, name: 'Desk', category: 'furniture', price: 299 },
    { id: 4, name: 'Chair', category: 'furniture', price: 199 },
];

app.get('/api/products', (req, res) => {
    const { category, sort, page = 1, limit = 10 } = req.query;
    let result = [...products];
    // TODO: filter by category (case-insensitive)
    if (category) {
        result = result.filter(x => x.category === category.toLowerCase())
    }
    // TODO: sort — check for '-' prefix to determine direction    
    sort && sort[0] === '-' ? result.sort((a, b) => b[sort.substring(1)] - a[sort.substring(1)]) :result.sort((a, b) => a[sort] - b[sort]);

    const total = result.length;
    // TODO: paginate — slice result based on page & limit
    if(page && limit){
        const start=(page-1)*limit
        const end=start+limit
        result=result.slice(start,end)
    }
    res.json({ data: result, total, page: +page, limit: +limit });
});


app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
});