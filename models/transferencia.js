const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transferencia', {
    transferencia_id: {
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
    cedula: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "cedula"
    },
    anterior_nombre_del_club: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nuevo_nombre_del_club: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transferencia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transferencia_id" },
        ]
      },
      {
        name: "cedula",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cedula" },
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
