module.exports = (sequelize, DataTypes) => {
    const Changelog = sequelize.define('changelog', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicle_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        log_activity: DataTypes.TEXT,
    }, {
        timestamps: false,
    })
    return Changelog
}