const contrato = artifacts.require("DellFactory");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contrato);
  };