import { Command, flags } from '@oclif/command';
import axios from 'axios';
import { loadWallet } from '../helpers/wallet-helpers';
const dotenv = require('dotenv');
dotenv.config({ path: './key.env' });

export default class Gettransactions extends Command {
  static description = 'Get the list of bitcoin transactions of a wallet';

  static flags = {
    name: flags.string({ char: 'n', description: 'Name of the wallet', required: true }),
  };

  async run() {
    const { flags } = this.parse(Gettransactions);
    const wallet = loadWallet(flags.name);

    if (wallet) {
      await this.getTransactions(wallet);
    }
  }

  async getTransactions(wallet: { mnemonic: string; addresses: string[] }) {
    if (wallet.addresses.length === 0) {
      this.error('Error: No addresses found in the wallet');
    }

    const address = wallet.addresses[0];
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`;


    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Token ${process.env.BLOCKCYPHER_API_KEY}`
        }
      });

      if (response.data.txs.length === 0) {
        this.log('No transactions found for this wallet.');
        return;
      }

      this.log('Transactions:');
      response.data.txs.forEach((tx: {
        hash: string;
        block_height: number;
        total: number;
      }) => {
        this.log(`Transaction Hash: ${tx.hash}`);
        this.log(`Block Height: ${tx.block_height}`);
        this.log(`Total Value: ${tx.total / 100000000} BTC`);
        this.log('---');
      });
    } catch (error) {
      this.error('Error: Failed to fetch the transactions');
    }
  }
}
