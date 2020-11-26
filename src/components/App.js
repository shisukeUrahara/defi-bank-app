import React, { useState,useEffect } from 'react'
import Navbar from './Navbar';
import {getWeb3,getContracts} from './utils.js';
import './App.css';
import Main from './Main.js';

function App () {

 

  const [account,setAccount]= useState(undefined);
  const [web3,setWeb3]= useState(undefined);
  const [contracts,setContracts] = useState(undefined);
  const [daiTokenBalance,setDaiTokenBalance]=useState('0');
  const [dappTokenBalance,setDappTokenBalance]=useState('0');
  const [stakingBalance,setStakingBalance]= useState('0');

  const stakeTokens = async (amount)=>{
    // approve the contract to spend tokens on user's behalf
    // let tokenFarmAddress= await contracts.tokenFarm.methods.address();
    // console.log("**@ the ")
    let stakeAmount= web3.utils.toWei(amount,"ether");
    // console.log("**@ the stake amount is , ",stakeAmount);

    // return;
    await contracts.daiToken.methods.approve(contracts.tokenFarm._address,stakeAmount)
    .send({from:account})
    .on('transactionHash',async (txhash)=>{


      await contracts.tokenFarm.methods.stakeTokens(stakeAmount).send({from:account});

      let updatedDaiBalance =await contracts.daiToken.methods.balanceOf(account).call();

      setDaiTokenBalance(updatedDaiBalance);
      // console.log("**@ updated dai token balance is , ",daiTokenBalance);
  
      let updatedDappBalance= await contracts.dappToken.methods.balanceOf(account).call() ;
      setDappTokenBalance(updatedDappBalance);
      // console.log("**@ updated dapp token balance is , ",dappTokenBalance);
  
  
      let updatedStakingBalance=  await contracts.tokenFarm.methods.stakeBalances(account).call();
      setStakingBalance(updatedStakingBalance);
      // console.log("**@ updated staking  balance is , ",stakingBalance);
    });





    
  }

  const unstakeTokens= async ()=>{

    await contracts.tokenFarm.methods.unstakeTokens().send({from:account});

    let updatedDaiBalance =await contracts.daiToken.methods.balanceOf(account).call();

      setDaiTokenBalance(updatedDaiBalance);
      // console.log("**@ updated dai token balance is , ",daiTokenBalance);
  
      let updatedDappBalance= await contracts.dappToken.methods.balanceOf(account).call() ;
      setDappTokenBalance(updatedDappBalance);
      // console.log("**@ updated dapp token balance is , ",dappTokenBalance);
  
  
      let updatedStakingBalance=  await contracts.tokenFarm.methods.stakeBalances(account).call();
      setStakingBalance(updatedStakingBalance);
      // console.log("**@ updated staking  balance is , ",stakingBalance);

  }


  useEffect(()=>{

   const init = async ()=>{
    const web3= await getWeb3();
    setWeb3(web3);
    // console.log("**@ web3 from utils is , ",web3);

    const contracts= await getContracts(web3);
    setContracts(contracts);
    // console.log("**@ contracts from utils are , ",contracts);
    // console.log(":**@ the token farm contract is , ",contracts.tokenFarm._address)

    

    const accounts= await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // console.log("**@ accounts from utils are , ",accounts);

    // get dai and dapp token balance 
    const daiTokenBalance = await contracts.daiToken.methods.balanceOf(accounts[0]).call();
    // console.log("**@ daiToken balance is , ",daiTokenBalance);
    setDaiTokenBalance(daiTokenBalance);

    const dappTokenBalance = await contracts.dappToken.methods.balanceOf(accounts[0]).call();
    // console.log("**@ dappToken balance is , ",dappTokenBalance);
    setDappTokenBalance(dappTokenBalance);

    const stakingBalance = await contracts.tokenFarm.methods.stakeBalances(accounts[0]).call();
    // console.log("**@ the staking balance for connected account is , ",stakingBalance);
    setStakingBalance(stakingBalance);

   
   }

   init();

  },[])

  const isReady = ()=>{
    return (
      typeof web3!=='undefined' &&
      typeof contracts !=='undefined' &&
      typeof account!=='undefined'
    )
  }



  let  ready = isReady();
  // console.log("**@ is ready is , ",ready);




  if(!ready){
    return (
      <div>LOADING .....</div>
    )
   
  }
  else{
      

    return (
      <div>
    <Navbar account={account} />
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
          <div className="content mr-auto ml-auto">
            <a
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>

            <Main
            web3={web3}
            daiTokenBalance={daiTokenBalance}
            dappTokenBalance={dappTokenBalance}
            stakingBalance={stakingBalance}
            stakeTokens={stakeTokens}
            unstakeTokens={unstakeTokens}
         

            
            ></Main>


          </div>
        </main>
      </div>
    </div>
  </div>
    )

  }
    

      

      
    
  
}

export default App;



