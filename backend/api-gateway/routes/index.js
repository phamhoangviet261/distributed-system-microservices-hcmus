const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');
const loadbalancer = require('../utils/loadbalancer');
const fs = require('fs');

const instanceAlreadyExists = (instance) => {
    return registry.services[instance.apiName].instances.some((instanceExist) => {
        let isSame = true;
        for (let field in instanceExist) {
            if (instanceExist[field] !== instance[field]) {
                isSame = false;
                break;
            }
        }
        if (isSame) return true;
    });
};

router.post('/register', async (req, res, next) => {
    try {
        const resgistration = req.body;
        resgistration.url = resgistration.protocol + '://' + resgistration.host + ':' + resgistration.port;

        if (registry.services[resgistration.apiName]) {
            if (instanceAlreadyExists(resgistration)) {
                throw new Error(`This instance already exists in [${resgistration.apiName}]`);
            }
            registry.services[resgistration.apiName].instances.push({...resgistration});
        } else {
            registry.services[resgistration.apiName] = {index: 0, instances: [{...resgistration}]};
        }

        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                throw new Error(`Could not register [${resgistration.apiName}] \n${error.message}`);

            } else {
                res.send(`Successfully registered [${resgistration.apiName}]`);
            }
        });
    } catch (error) {
        console.log('Error: ', error.message);
        return res.status(400).json({success: false, message: error.message});
    }
});

router.post('/unregister', async (req, res, next) => {
    try {
        const resgistration = req.body;
        resgistration.url = resgistration.protocol + '://' + resgistration.host + ':' + resgistration.port;
        if (!registry.services[resgistration.apiName]) {
            throw new Error(`Service name [${resgistration.apiName}] does not exist`);
        }

        if (!instanceAlreadyExists(resgistration)) {
            throw new Error(`This instance does not exist in [${resgistration.apiName}]`);
        }

        registry.services[resgistration.apiName].instances = registry.services[resgistration.apiName].instances.filter((instance) => instance.url !== resgistration.url);

        if (registry.services[resgistration.apiName].instances.length === 0) {
            delete registry.services[resgistration.apiName];
        }

        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                throw new Error(`Could not unregister [${resgistration.apiName}] \n${error.message}`);
            } else {
                res.send(`Successfully unregistered [${resgistration.apiName}]`);
            }
        });
    } catch (error) {
        console.log('Error: ', error.message);
        return res.status(400).json({success: false, message: error.message});
    }
});

router.use('/:apiName', async (req, res, next) => {
    try {
        console.log('\n', new Date());
        const {apiName} = req.params;
        const {path} = req;
        const service = registry.services[apiName];
        if (!service) {
            throw new Error(`Service name [${apiName}] does not exist`);
        }
        console.log(`Service [${apiName}] has been called`);
        const newIndex = loadbalancer(service);
        const serviceInstance = service.instances[newIndex];
        console.log(`Instance [${newIndex}] is using`);
        const options = {
            method: req.method,
            url: serviceInstance.url + path,
            data: req.body,
            headers: {'content-type': req.headers['content-type']}
        };

        const axiosRespond = await axios(options);
        res.send(axiosRespond.data);
    } catch (error) {
        console.log('Error: ', error.message);
        return res.status(400).json({success: false, message: error.message});
    }
});

module.exports = router;
