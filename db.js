const Sequelize = require('sequelize');
const sequelize = new Sequelize('Testing','root','welcome',
    {
        dialect:'mysql',
        logging:false                   //prevent logger msg of sequelize
    },
    {
        freezeTableName: true           //prevent plural of table names
    }
);

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.customers = require('./models/customers.model')(sequelize,Sequelize);
db.orders = require('./models/orders.model')(sequelize,Sequelize);


//Relations
db.customers.hasMany(db.orders);
db.orders.belongsTo(db.customers);


db.sequelize.sync().then(() =>{
    console.log('Connected to db...!!');
}).catch(err =>{
    console.error('Error while connecting to database',err);
});


exports.db = db;
exports.Customers = db.customers;
exports.Orders = db.orders;