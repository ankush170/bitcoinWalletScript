import { Command, flags } from '@oclif/command';
import * as bip39 from 'bip39';
import { loadWallets, saveWallet } from '../helpers/wallet-helpers';
import * as path from 'path';
import * as fs from 'fs';

const walletsDir = path.join(__dirname, '../../wallets');

export default class Importwallet extends Command {
  static description = 'Import a wallet from a BIP39 mnemonic';

  static flags = {
    name: flags.string({ char: 'n', description: 'Name of the wallet', required: true }),
    mnemonic: flags.string({ char: 'm', description: 'BIP39 mnemonic', required: true }),
  };

  async run() {
    const { flags } = this.parse(Importwallet);

    if (!fs.existsSync(walletsDir)) {
      fs.mkdirSync(walletsDir);
    }

    const wallets = loadWallets();

    if (wallets[flags.name]) {
      this.error(`Error: Wallet with name ${flags.name} already exists`);
      return;
    }

    if (!bip39.validateMnemonic(flags.mnemonic)) {
      this.error('Error: Invalid mnemonic');
      return;
    }

    saveWallet(flags.name, flags.mnemonic);
    this.log(`Wallet ${flags.name} imported with mnemonic: ${flags.mnemonic}`);
  }
}
