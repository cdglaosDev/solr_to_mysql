module.exports = (sequelize, DataTypes) => {
    const VehicleLog = sequelize.define('vehicle_log', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicle_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: { type: DataTypes.TINYINT(2), defaultValue: 1 },
        name: DataTypes.STRING(100),
        from: DataTypes.STRING(100),
        to: DataTypes.STRING(100),
        app_request_no: DataTypes.STRING(100),
        veh_log_activity: DataTypes.TEXT,
        datetime: DataTypes.STRING(25),
        user_id: DataTypes.INTEGER,
        ip_address: DataTypes.STRING(20)
    })
    return VehicleLog;
}