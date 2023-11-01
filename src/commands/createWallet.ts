import { Command, flags } from '@oclif/command';
import { loadWallets, saveWallet } from '../helpers/wallet-helpers';
import * as bip39 from 'bip39';

export default class Createwallet extends Command {
  static description = 'Create a new BIP39 wallet';

  static flags = {
    name: flags.string({ char: 'n', description: 'Name of the wallet', required: true }),
  };

  async run() {
    const { flags } = this.parse(Createwallet);
    const name = flags.name;

    const wallets = loadWallets();
    if (wallets[name]) {
      this.error(`Error: Wallet with name ${name} already exists`);
      return;
    }

    const mnemonic = bip39.generateMnemonic();

    saveWallet(name, mnemonic);

    this.log(`Wallet ${name} created with mnemonic: ${mnemonic}`);
  }
}
