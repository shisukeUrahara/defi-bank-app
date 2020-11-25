pragma solidity ^0.6.0;
import './DaiToken.sol';
import './DappToken.sol';

contract TokenFarm {
    string public name ="Dapp Token Farm";

    DappToken public dappToken;
    DaiToken public daiToken;

    constructor(DaiToken _daiToken, DappToken _dappToken)public {
      dappToken=_dappToken;
      daiToken=_daiToken;
    }
}