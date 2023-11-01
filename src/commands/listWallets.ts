import { Command } from '@oclif/command';
import { loadWallets } from '../helpers/wallet-helpers';

export default class Listwallets extends Command {
  static description = 'List all wallets';

  async run() {
    const wallets = loadWallets();

    if (Object.keys(wallets).length === 0) {
      this.log('No wallets found.');
      return;
    }

    this.log('Wallets:', Object.keys(wallets));
  }
}
