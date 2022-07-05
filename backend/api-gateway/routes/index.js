const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');
const fs = require('fs');

router.use('/:apiName/:path', async (req, res, next) => {
    try {
        const {apiName, path} = req.params;
        console.log(`Service [${apiName}] has been called`);
        console.log(path);
        if (!registry.services[apiName]) {
            console.log('API name does not exist');
            res.send('API name does not exist');
            return;
        }

        const option = {
            method: req.method,
            url: registry.services[apiName].url + path + req.path,
            headers: req.headers,
            data: req.body
        };
        console.log(apiName, "/", path, req.path,);
        const axiosRespond = await axios(option);

        res.send(axiosRespond.data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const resgistration = req.body;
        resgistration.url = resgistration.protocol + '://' + resgistration.host + ':' + resgistration.port + '/';
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
