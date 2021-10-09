const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('dawraty', 'lposadmin', 'secret', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})

var initModels = require("./models/init-models");
var models = initModels(sequelize);

models.users.findAll({}).then((users) => {
    fs.writeFileSync(path.resolve(__dirname + "/mongo-models/", 'users.json'), JSON.stringify(users, null, 2));
    console.log("Done Writing");
}).catch((error) => {
    console.log("Error", error)
});
