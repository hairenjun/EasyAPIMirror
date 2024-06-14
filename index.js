const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// POST请求路由
app.post('/', async (req, res) => {
    const { endpoint, requestData } = req.body;
    try {
        const response = await axios.post(endpoint, requestData);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET请求路由
app.get('/', async (req, res) => {
    const { endpoint } = req.query;
    try {
        const response = await axios.get(endpoint);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});