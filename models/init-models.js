var DataTypes = require("sequelize").DataTypes;
var _club = require("./club");
var _contacto = require("./contacto");
var _documentacion = require("./documentacion");
var _jugador = require("./jugador");
var _representante = require("./representante");
var _sequelizemeta = require("./sequelizemeta");
var _torneo = require("./torneo");
var _transferencia = require("./transferencia");

function initModels(sequelize) {
  var club = _club(sequelize, DataTypes);
  var contacto = _contacto(sequelize, DataTypes);
  var documentacion = _documentacion(sequelize, DataTypes);
  var jugador = _jugador(sequelize, DataTypes);
  var representante = _representante(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var torneo = _torneo(sequelize, DataTypes);
  var transferencia = _transferencia(sequelize, DataTypes);

  jugador.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(jugador, { as: "jugadors", foreignKey: "club_id"});
  jugador.belongsTo(contacto, { as: "contacto", foreignKey: "contacto_id"});
  contacto.hasMany(jugador, { as: "jugadors", foreignKey: "contacto_id"});
  jugador.belongsTo(documentacion, { as: "documentacion", foreignKey: "documentacion_id"});
  documentacion.hasMany(jugador, { as: "jugadors", foreignKey: "documentacion_id"});
  representante.belongsTo(jugador, { as: "jugador", foreignKey: "jugador_id"});
  jugador.hasMany(representante, { as: "representantes", foreignKey: "jugador_id"});
  torneo.belongsTo(jugador, { as: "jugador", foreignKey: "jugador_id"});
  jugador.hasMany(torneo, { as: "torneos", foreignKey: "jugador_id"});
  transferencia.belongsTo(jugador, { as: "jugador", foreignKey: "jugador_id"});
  jugador.hasMany(transferencia, { as: "transferencia", foreignKey: "jugador_id"});

  return {
    club,
    contacto,
    documentacion,
    jugador,
    representante,
    sequelizemeta,
    torneo,
    transferencia,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
