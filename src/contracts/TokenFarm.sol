pragma solidity ^0.6.0;
import './DaiToken.sol';
import './DappToken.sol';

contract TokenFarm {
    string public name ="Dapp Token Farm";

    DappToken public dappToken;
    DaiToken public daiToken;
    address public  owner;
    // a mapping to keep track of the staked balances of users
    mapping(address=>uint) public  stakeBalances;
    // a mapping to keep track of whether user has staked tokens or not
    mapping(address=>bool) public hasStaked;
    //  a mapping to determine if user is currently staking or not
    mapping(address=> bool) public isStaking;
    // an array to keep track of all the users who have staked tokens
    address[] public stakers;
    

    constructor(DaiToken _daiToken, DappToken _dappToken)public {
      dappToken=_dappToken;
      daiToken=_daiToken;
      owner=msg.sender;
    }

    // a method to stake tokens (deposit)
    function stakeTokens(uint _amount) external {

        require(_amount>0,'Cannot stake 0 tokens');

        // send the dai tokens from user to contract address'
        daiToken.transferFrom(msg.sender,address(this),_amount);

        // update the staking balance of user
        stakeBalances[msg.sender] = stakeBalances[msg.sender]+_amount;

        // check if user has already staked tokens , if not add them to stakers list
        if(!hasStaked[msg.sender]){
         stakers.push(msg.sender);

        }
        // update the hasStaked status
                isStaking[msg.sender] =true;
                hasStaked[msg.sender]=true;
    }


    // a method to unstake tokens (withdraw)

    function unstakeTokens() external {
        // get the sender's staking balance 
        uint balance = stakeBalances[msg.sender];

        require(balance>0,'Cannot unstake 0 tokens');
        // transfer the dai token back to the contract
        daiToken.transfer(msg.sender,balance);

        // change the staking balance to 0
        stakeBalances[msg.sender]=0;

        // change isStaking balace to false
        isStaking[msg.sender]=false;


    }


    // a method to issue tokens to reward users for using the app
    function issueTokens() external {

        // check that caller is owner
        require(msg.sender==owner,'Owner privileges required');
        // loop through stakers and reward them with tokens
        for(uint i=0;i<stakers.length;i++){
            address recipient = stakers[i];

            uint balance = stakeBalances[recipient];

            if(balance>0){
              dappToken.transfer(recipient,balance);
            } 
        
        }
    }

}