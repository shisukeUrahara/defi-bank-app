const TokenFarm = artifacts.require("TokenFarm");
const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");


module.exports = async function(deployer,_network,accounts) {

    let investor= accounts[1];

// deploy the dai token contract
await deployer.deploy(DaiToken);
let daiToken=await  DaiToken.deployed();
console.log("**@ dai token address is , ",daiToken.address);

// deploy the dapp token contract
await deployer.deploy(DappToken);
let dappToken=await  DappToken.deployed();
console.log("**@ dapp token address is , ",dappToken.address);



  await deployer.deploy(TokenFarm,daiToken.address,dappToken.address);
  let tokenFarm= await TokenFarm.deployed();

  // send all dapp tokens to the token farm smart contract
  await  dappToken.transfer(tokenFarm.address,'1000000000000000000000000');

  // send some dai tokens to the investor account 
  await daiToken.transfer(investor,'1000000000000000000000');



};
