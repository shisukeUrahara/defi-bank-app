import Web3 from 'web3';
import ERC20ABI from './ERC20ABI.json';
import tokenFarmJson from '../abis/TokenFarm.json';
import dappTokenJson from '../abis/DappToken.json';
import daiTokenJson from '../abis/DaiToken.json';


const getWeb3 = async () => {
  // const provider = new Web3.providers.HttpProvider(
  //   "http://localhost:9545"
  // );
  // return new Web3(provider);
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

const getContracts =async (web3)=>{

   

  
    // Load Token
  const networkId =  await web3.eth.net.getId();
  // console.log("**@ util network id is , ",networkId);
  const tokenFarmNetwork = tokenFarmJson.networks[networkId];
  // console.log("**@ tokenFarmNetwork is , ",tokenFarmNetwork);
  let tokenFarm;
  if(tokenFarmNetwork!==undefined){
     tokenFarm= new web3.eth.Contract(tokenFarmJson.abi,tokenFarmNetwork.address);
  }
  
  

  const daiTokenNetwork = daiTokenJson.networks[networkId];
  let daiToken;
  if(daiTokenNetwork!==undefined){
     daiToken= new web3.eth.Contract(daiTokenJson.abi,daiTokenNetwork.address)|| undefined ;
  }
  

  const dappTokenNetwork = dappTokenJson.networks[networkId];
  let dappToken;
  if(dappTokenNetwork!==undefined){
     dappToken = new web3.eth.Contract(dappTokenJson.abi,dappTokenNetwork.address) || undefined;

  }

 
  




    return ({
        tokenFarm,
        daiToken,
        dappToken
    });
}

export { getWeb3,getContracts };