// use Round Robin algorithm
const loadbalancer = (service) => {
    let newIndex;
    if (service.index + 1 >= service.instances.length) {
        newIndex = 0;
    } else {
        newIndex = service.index + 1;
    }
    service.index = newIndex;
    return newIndex;
};

module.exports = loadbalancer;
