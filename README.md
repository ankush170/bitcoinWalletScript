Install Dependencies: Navigate to the project directory and install the required dependencies:


cd bitcoinWalletScript
npm install
Set Up Environment Variables: Create a .env file in the project root directory to store your API key:


cp .env.example .env
Open the .env file and replace YOUR_API_KEY with your actual API key.

Run the CLI: You can now use the CLI by running the following commands:


npx bitcoinWalletScript <command>


Usage
The Bitcoin Wallet CLI offers several commands to manage Bitcoin wallets. Each command provides different functionality. You can invoke commands with the following syntax:


npx bitcoinWalletScript <command> [options]
Replace <command> with the specific command you want to run and provide any required or optional options as needed.

Commands
Here are the available commands and their descriptions:

Create Wallet
Use this command to create a new Bitcoin wallet.


npx bitcoinWalletScript createwallet -n <walletName>
-n, --name: Required. Specify the name of the wallet.
Generate Address
Generate a new Bitcoin address for an existing wallet.


npx bitcoinWalletScript generateAddress -n <walletName>
-n, --name: Required. Specify the name of the wallet for which you want to generate an address.
Get Balance
Check the Bitcoin balance of a wallet.


npx bitcoinWalletScript getBalance -n <walletName>
-n, --name: Required. Specify the name of the wallet.
Get Transactions
View the list of Bitcoin transactions for a wallet.


npx bitcoinWalletScript getTransactions -n <walletName>
-n, --name: Required. Specify the name of the wallet.