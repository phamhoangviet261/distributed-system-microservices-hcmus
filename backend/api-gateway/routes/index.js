const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');
const fs = require('fs');

router.all('/:apiName/:path', async (req, res, next) => {
    try {
        const {apiName, path} = req.params;
        console.log(req.params.apiName);

        if (!registry.services[apiName]) {
            console.log('API name does not exist');
            res.send('API name does not exist');
            return;
        }

        const resfake = await axios({
            method: req.method,
            url: registry.services[apiName].url + path,
            headers: req.headers,
            data: req.body
        });
        console.log(resfake.status);
        // console.log(resfake.data);
        res.send(resfake.data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const resgistration = req.body;
        registry.services[resgistration.apiName] = {...resgistration};

        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                res.send('Could not register ' + resgistration.apiName + '\n' + error);
            } else {
                res.send('Successfully registered ' + resgistration.apiName);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
