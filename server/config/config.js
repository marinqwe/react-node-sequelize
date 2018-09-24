const path = require('path');

module.exports = {
    'config': path.resolve('config', 'config.json'),
    'models-path': path.resolve('db', 'models'),
    'seeders-path': path.resolve('db', 'seeders'),
    'migrations-path': path.resolve('db', 'migrations')
};