const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('club', {
    club_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    club_nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ruc: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    presidente: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    delegado: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    provincia: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    registro_de_directorio: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    acuerdo_ministerial: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'club',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
    ]
  });
};
