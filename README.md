# boostr
This app allows you to create and fund projects (called Boostrs). Creators of projects can also add spending requests to the project in order to reelase funds. If a majority of funders approved the request and there are sufficient funds in the Boostr account the Boostr creator can implement the payment to the vendor in exchange for services or goods. In order to be granted voting rights on requests a funder needs to stake a minimum amount that is defined at time of the Boostr project creation.

Truffle migration does not yet support factory pattern (https://github.com/trufflesuite/truffle/issues/237) therefore the project has compile and deploy scripts.

## Details
### Design
This project uses a factory design pattern (https://ethereumdev.io/manage-several-contracts-with-factories/).

### Security
- Restricting access - Modifiers are used to restrict function access so that only specific addresses are permitted to execute functions
- A withdraw pattern is adopted to prevent re-entrancy and denial of service attacks
- An emergency circuit breaker has been included that prevents new Boostrs being created or contributions to exisiting Boostrs being made.
- Boostr contract uses `.transfer` instead of `.send`

## boostrFactory setup
1. Copy or clone the Boostr respository to your local machine
2. `cd` into the root folder of boostrFactory
3. Install the npm modules
4. Create a file named `.env`
```bash
git clone https://github.com/lesansley/boostr.git
cd boostr/boostrFactory
npm install
echo $'PORT=3000\nMNEMONIC=[YOUR_SEED_WORDS_HERE]\nINFURA_RINKEBY_ENDPOINT=https://rinkeby.infura.io/v3/[YOUR_API_KEY_HERE]' >.env
```
5. Create an Infura account (https://infura.io/)
6. Navigate to Dashboard (https://infura.io/dashboard)
7. Copy your API KEY
8. Paste the your key into the INFURA_RINKEBY_ENDPOINT variable that you created in `.env`
9. Add the MetaMask browser extension (https://metamask.io/)
10. Sign into MetaMask in your browser
11. Select Rinkeby Test Network
12. Add funds to your account (https://faucet.rinkeby.io/)
13. Create more accounts
14. Send ether to the newly created accounts
15. Go into MetaMask settings
16. Select __REVEAL SEED WORDS__ and enter your password
17. Copy your seed words
18. Paste your seeds words into the MNEMONIC variable that you created in `.env` (Do not enclose in quotes)
19. Make sure you save the `.env` file
20. Compile and deploy the contract
```bash
npm run compile
npm run deploy
```
21. Start the server
```bash
npm run dev
```
22. In your web browser navigate to localhost:3000

### Add a Boostr
- Select a different account in MetaMask
- Click __Add boostr__
- Complete the form fields
- Click on __Create__
- Click __Confirm__ in MetaMask to approve the transaction
- Click __View boostr__ to see a summary of the Boostr you have just created

### Add a Request
- Click __Requests__
- Click __New request__
- Complete the form fields
- In MetaMask select a new account for the supplier and copy the address
- Paste the address into teh Recipient field
- In MetaMask select the Boostr creator's account
- Click on __Create__
- Click __Confirm__ in MetaMask to approve the transaction

### Fund a Boostr
- Click __Boostrs__
- Click __View boostr__
- In MetaMask select a new account
- Enter an amount to contribute in the _Contribute to this boostr_ field
- Click on __Create__
- Click __Confirm__ in MetaMask to approve the transaction

### Approve a request
- Click __Requests__
- Click __Approve__
- Click __Confirm__ in MetaMask to approve the transaction

### Finalise a request
- In MetaMask select the Boostr creator's account
- Click __Finalise__
- Click __Confirm__ in MetaMask to approve the transaction

### Withdraw ether as a supplier
- In MetaMask select the supplier's account
- Click __Boostrs__
- Click __View boostr__
- Enter the amount you wish to withdraw from teh contract in the _Withdraw from this boostr_ field
- Click __Withdraw__ in MetaMask to approve the transaction


## boostrTruffle migration
```bash
cd boostrTruffle
cp ../boostrFactory/.env ./
truffle compile
truffle migrate
```
Boostr is deployed to the Rinkeby network
Start your server
```bash
npm run dev
```
In your web browser navigate to localhost:3000

## Test
```bash
cd boostrFactory
npm run test
```
Acknowledgements: 
https://github.com/StephenGrider
https://espeoblockchain.com/blog/smart-contracts-explained/
