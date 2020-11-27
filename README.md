# defi-bank-app

# DEFI TOKEN FARM 





# DESCRIPTION 

This application allows the user to stake mock dai tokens and get dapp tokens in return. The user can also unstake all of its tokens anytime.

# TECH STACKS USED

 (i) Javascript 
 (ii) Reactjs  
 (iii) Ethereum  
 (iv) Solidity  
 (v) Truffle 
 (vi) Web3 js 
 (vii) Metamask 

# SETTING UP THE NETWORK

(i) Clone the repo
> git clone repoUrl

(ii) Go to the project directory and start the local truffle network by running

> truffle develop

(iii) The truffle develop command will open the truffle console , deploy the contracts in that console

> migrate --reset

(iv) Install metamask plugin in your browser and create a custom network in it or
import the local truffle newtork accounts there using the seedphrase you get when you run truffle develop

(v) Run the application 
  NOTE:- Make sure the metamask plugin is installed in your browser.

> npm run start

This will start the application in your browser at http://localhost:3000

(vi) Connect to the truffle network in you metamask and have fun.

(vii) REWARDING THE USERS WITH DAPP TOKENS

To reward the user , run the issueToken script. In the truffle develop console run 
> exec scripts/issueToken.js
