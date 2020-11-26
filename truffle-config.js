require('babel-register');
require('babel-polyfill');
const provider= require('@truffle/hdwallet-provider');
const fs= require('fs');

const secrets= JSON.parse(fs.readFileSync('.secrets.json').toString().trim());

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    kovan:{
      provider:()=>{
        return new provider(
          secrets.privateKeys,
          secrets.infuraUrl,
          0,
          3
        )
      },
      network_id:42
 
 
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {

    solc: {
      version:"0.6.0",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
