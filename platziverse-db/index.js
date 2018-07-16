const setupDataBase = require('./lib/db');
const setupAgentModel = require('./models/agent');
const setupMetrictModel = require('./models/metric');

module.exports = async function (config) {
  const sequelize = setupDataBase(config);
  const AgentModel = setupAgentModel(config);
  const MetricModel = setupMetrictModel(config);
  /*RELACIÓNES (AGREGA AL MODELO LA FORIGN KEY)*/
  AgentModel.hasMany(MetricModel);
  MetricModel.belongsTo(AgentModel);

  await sequelize.authenticate();
  /*método que crea los modelos en la DB*/
  sequelize.sync();

  const Agent = {};
  const Metric = {};

  return { Agent, Metric };
};
