## Description

Simple Supply-Chain Dapp for Ethereum blockchain. 
    
Devstack: React, Redux, Drizzle, Web3, Solidity, MUI, Webpack5  

### Necesary steps for starting the local Development blockchain server  
1. Download and install Ganache --> https://trufflesuite.com/ganache/index.html<br/>
2. Download and install Truffle --> https://trufflesuite.com/truffle/<br/>
3. Git clone repository<br/>
4. Run Ganache<br/>
5. Open terminal in project root folder<br/>
6. Migrate smart contracts with command: <br/>
##
    truffle migrate  
You can compile the smart contracts before migrating the to see if there are any compile errors.With command:<br/>
##
    truffle compile
7.  Run: <br/>
##
    cd client
8. Finally: <br/>
##
    npm start 
to start React