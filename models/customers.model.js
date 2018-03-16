module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define('customers', {
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    });
    return Customers;
};