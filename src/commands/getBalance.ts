import { Command, flags } from '@oclif/command';
import axios from 'axios';
import { loadWallet } from '../helpers/wallet-helpers';
const dotenv = require('dotenv');
dotenv.config({ path: './key.env' });


export default class Getbalance extends Command {
  static description = 'Get the bitcoin balance of a wallet';

  static flags = {
    name: flags.string({ char: 'n', description: 'Name of the wallet', required: true }),
  };

  async run() {
    const { flags } = this.parse(Getbalance);
    const wallet = loadWallet(flags.name);

    if (wallet) {
      await this.getBalance(wallet);
    }
  }

  async getBalance(wallet: { mnemonic: string; addresses: string[] }) {
    if (wallet.addresses.length === 0) {
      this.error('Error: No addresses found in the wallet');
      return;
    }

    const address = wallet.addresses[0];
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}`;


    try {
      const response = await axios.get(url,{
        headers: {
          'Authorization': `Token ${process.env.BLOCKCYPHER_API_KEY}`
        }
      });
      this.log(`Balance: ${response.data.balance} satoshis`);
    } catch (error) {
      this.error('Error: Failed to fetch the balance');
    }
  }
}
