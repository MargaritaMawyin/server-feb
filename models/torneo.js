const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('torneo', {
    torneo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jugador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jugador',
        key: 'jugador_id'
      }
    },
    fecha_torneo: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    nombre_club: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'torneo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "torneo_id" },
        ]
      },
      {
        name: "jugador_id",
        using: "BTREE",
        fields: [
          { name: "jugador_id" },
        ]
      },
    ]
  });
};
