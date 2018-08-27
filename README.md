# boostr
This app allows you to create and fund projects (called Boostrs). Creators of projects can also add spending requests to the project in order to reelase funds. If a majority of funders approved the request and there are sufficient funds in the Boostr account the Boostr creator can implement the payment to the vendor in exchange for services or goods. In order to be granted voting rights on requests a funder needs to stake a minimum amount that is defined at time of the Boostr project creation.

## Factory setup
1. Copy or clone the Boostr respository to your local machine
2. `cd` into the root respository folder
3. Install the npm modules
4. `cd` into the factory folder
5. Create a file named `.env`
```bash
git clone https://github.com/lesansley/boostr.git
cd boostr
npm install
cd boostr/factory
echo $'PORT=3000\nMNEMONIC=[YOUR_SEED_WORDS_HERE]\nINFURA_RINKEBY_ENDPOINT=https://rinkeby.infura.io/v3/[YOUR_API_KEY_HERE]' >.env
```
6. Create an Infura account (https://infura.io/)
7. Navigate to Dashboard (https://infura.io/dashboard)
8. Copy your API KEY
9. Paste the your key into the INFURA_RINKEBY_ENDPOINT variable that you created in `.env`
10. Add the MetaMask browser extension (https://metamask.io/)
11. Sign into MetaMask in your browser
12. Select Rinkeby Test Network
13. Add funds to your account (https://faucet.rinkeby.io/)
14. Create more accounts
15. Send ether to the newly created accounts
16. Go into MetaMask settings
17. Select __REVEAL SEED WORDS__ and enter your password
18. Copy your seed words
19. Paste your seeds words into the MNEMONIC variable that you created in `.env` (Do not enclose in quotes)
20. Make sure you save the `.env` file
21. Compile and deploy the contract
```bash
npm run compile
npm run deploy
```
22. Start the server
```bash
npm run dev
```
23. In your web browser navigate to localhost:3000

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
- In MetaMask select a new account and copy the address
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

## Test
```bash
npm run test
```
Acknowledgements: 
Stephen Grider - https://github.com/StephenGrider
