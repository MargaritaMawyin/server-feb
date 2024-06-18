const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('representante', {
    representante_id: {
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
      allowNull: false
    },
    nombres_representante: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellidos_representante: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'representante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "representante_id" },
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
