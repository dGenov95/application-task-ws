const envConfig = {
    development: {
        dbUrl: 'mongodb://localhost:27017/application_db',
        port: 3000,
        rootPath: '../',
    },
    production: {
        dbUrl: '',
        port: process.env.PORT || 3000,
        jwtSercret: process.env.SECRET || '',
        rootPath: '../',        
    }
};

module.exports = envConfig;