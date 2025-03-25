const corsAnywhere = require('cors-anywhere');

module.exports = (req, res) => {
  corsAnywhere.createServer({
    originWhitelist: [], // autorise tous les domaines
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
  }).emit('request', req, res);
};
