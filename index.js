const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { URL } = require('url');

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
        const response = await axios.get(endpoint, { responseType: 'stream' });

        // 获取目标网站返回的 Content-Type
        const contentType = response.headers['content-type'];
        if (contentType) {
            res.set('Content-Type', contentType);
        }

        response.data.pipe(res); // 将目标网站的响应直接传递给客户端
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});