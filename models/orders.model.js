module.exports = (sequelize,DataTypes) =>{
    const Orders = sequelize.define('orders',{
        orderDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        amount:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false
        }
    });
    return Orders
};