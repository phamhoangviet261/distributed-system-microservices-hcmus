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
        console.log(req.method, ":", apiName, "/", path, req.path,);
        try {
            if(req.method == 'POST'){
                const axiosRespond = await axios.post(option.url, option.data, option.headers);
                res.send(axiosRespond.data);
            }
            else {
                const axiosRespond = await axios(option);
                res.send(axiosRespond.data);
            }
            
        } catch (errors) {
            return res.status(400).json({success: false, message: errors});
        }

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: error.message});
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
