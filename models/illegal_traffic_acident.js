module.exports = (sequelize, DataTypes) => {
    const Illegal_traffic_acident = sequelize.define('illegal_traffic_accident', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        illegal_traffic_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        traffic_accidence_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },{
        freezeTableName: true,

    })
    return Illegal_traffic_acident

}