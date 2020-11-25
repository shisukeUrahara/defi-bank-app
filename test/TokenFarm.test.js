const { assert } = require('chai');

const TokenFarm=artifacts.require('TokenFarm');
const DaiToken=artifacts.require('DaiToken');
const DappToken=artifacts.require('DappToken');

require('chai')
.use(require('chai-as-promised'))
.should();


const tokens= (n)=>{
    return web3.utils.toWei(n,"ether");
}

contract('TokenFarm', (accounts)=>{
    let daiToken,dappToken,tokenFarm;
    let investor=accounts[1];
    let owner=accounts[0];


     // before block to be run before each it block
     before(async ()=>{
        daiToken= await DaiToken.new();
        dappToken=await DappToken.new();
        tokenFarm=await TokenFarm.new(daiToken.address,dappToken.address);

        // send all tokens to the farm project
        await dappToken.transfer(tokenFarm.address,tokens('1000000'));

        //  send dai tokens to the investor
        await daiToken.transfer(investor,tokens('1000'),{from:owner});

   })

    // checking mock dai tokens are deployed properly

    describe('mock dai token is deployed properly',async ()=>{

       
        it('has a name',async ()=>{
            let name=await daiToken.name();


            assert.equal(name,'Mock DAI Token')
        })
    })

        // checking dapp tokens are deployed properly

        describe(' dapp token is deployed properly',async ()=>{

       
            it('has a name',async ()=>{
                let name=await dappToken.name();
    
    
                assert.equal(name,'DApp Token')
            })
        })

         // checking toke farm contract  is deployed properly

         describe('token farm contract  is deployed properly',async ()=>{

       
            it('has a name',async ()=>{
                let name=await tokenFarm.name();
    
    
                assert.equal(name,'Dapp Token Farm');
            })

            it('has all the dapp tokens',async ()=>{
                let balance=await dappToken.balanceOf(tokenFarm.address);
    
    
                assert.equal(balance.toString(),tokens('1000000'));
            })
        })

        // testing farming tokens functionality
        describe('Farming tokens' , async ()=>{

            it('should reward investors for staking mDai tokens',async ()=>{
                let balance;
            
                // checking investor's dai token balance before staking 
                balance= await daiToken.balanceOf(investor);
                assert.equal(balance.toString(),tokens('1000'),'Investor mDai token balance correct before staking tokens');
                     
                let amount=tokens('100');
                // approve tokenFarm contract to transfer mDai tokens on their behalf
                await daiToken.approve(tokenFarm.address,amount,{from:investor});

                // call the stake tokens method
                await  tokenFarm.stakeTokens(amount,{from:investor});

                // check mDai balance of user after staking
                balance= await daiToken.balanceOf(investor);

                assert.equal(balance.toString(),tokens('900'));

                // check that token farm contract got the staked tokens
                balance= await daiToken.balanceOf(tokenFarm.address,{from:owner});
                
                assert.equal(balance.toString(),tokens('100'));

                // check that staking balances are correct
                balance= await tokenFarm.stakeBalances(investor,{from:investor});

                assert.equal(balance.toString(),tokens('100'));

                // check that hasStaked and isStaking status is correct
                balance= await tokenFarm.hasStaked(investor,{from:investor});
                assert.equal(balance,true);

                balance= await tokenFarm.isStaking(investor,{from:investor});
                assert.equal(balance,true);

                // check the issue tokens functionality
                await tokenFarm.issueTokens({from:owner});

                balance=await dappToken.balanceOf(investor);

                assert.equal(balance.toString(),tokens('100'));

                // check that noone other than owner can call the issue token function
                await tokenFarm.issueTokens({from:investor}).should.be.rejected;


                // check that user is able to unstake tokens properly
                await tokenFarm.unstakeTokens({from:investor});

                // token farm contract should get back the dai tokens
                balance= await daiToken.balanceOf(tokenFarm.address);
                assert.equal(balance.toString(),'0');

                // user must get back the staked tokens
                balance= await daiToken.balanceOf(investor);
                assert.equal(balance.toString(),tokens('1000'));

                // the status of mappings  should be properly
                balance = await tokenFarm.stakeBalances(investor);
                assert.equal(balance.toString(),'0');

                balance=await tokenFarm.isStaking(investor);
                assert.equal(balance,false);

                





            })

        })



})