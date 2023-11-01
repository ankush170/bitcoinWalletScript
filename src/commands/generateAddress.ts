import { Command, flags } from '@oclif/command';
import * as bip39 from 'bip39';
import { loadWallet, saveWallet } from '../helpers/wallet-helpers';
const bitcoin = require('bitcoinjs-lib');

export default class Generateaddress extends Command {
  static description = 'Generate an unused bitcoin address for a wallet';

  static flags = {
    name: flags.string({ char: 'n', description: 'Name of the wallet', required: true }),
  };

  async run() {
    const { flags } = this.parse(Generateaddress);
    const wallet = loadWallet(flags.name);

    if (wallet) {
      this.getNewAddress(flags.name, wallet);
    }
  }

  async getNewAddress(name: string, wallet: { mnemonic: string; addresses: string[] }) {
    const seed = bip39.mnemonicToSeedSync(wallet.mnemonic);
    const root = bitcoin.bip32.fromSeed(seed, bitcoin.networks.testnet);

    const path = `m/44'/1'/0'/0/${wallet.addresses.length}`;

    const child = root.derivePath(path);

    const payment = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network: bitcoin.networks.testnet });
    if (payment && payment.address) {
      const address = payment.address;
      wallet.addresses.push(address);
      saveWallet(name, wallet.mnemonic, wallet.addresses); 
      this.log('New address:', address);
    } else {
      this.error('Error: Unable to generate a new address');
    }
  }
}
