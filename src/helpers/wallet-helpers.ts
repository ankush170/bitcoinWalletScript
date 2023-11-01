import * as fs from 'fs';
import * as path from 'path';

const walletsDir = path.join(__dirname, '../../wallets');

export function loadWallets() {
  if (!fs.existsSync(walletsDir)) {
    return {};
  }

  const walletFiles = fs.readdirSync(walletsDir);
  const wallets: { [name: string]: { mnemonic: string; addresses: string[] } } = {};

  for (const file of walletFiles) {
    const filePath = path.join(walletsDir, file);
    const walletData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    wallets[path.parse(file).name] = walletData;
  }

  return wallets;
}

export function loadWallet(name: string) {
  if (!fs.existsSync(walletsDir)) {
    return null;
  }

  const walletPath = path.join(walletsDir, `${name}.json`);

  if (!fs.existsSync(walletPath)) {
    return null;
  }

  const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
  return walletData;
}

export function saveWallet(name: string, mnemonic: string, addresses: string[] = []) {
  const walletData = loadWallet(name) || { mnemonic, addresses: [] };
  walletData.mnemonic = mnemonic;
  walletData.addresses = addresses;
  fs.writeFileSync(path.join(walletsDir, `${name}.json`), JSON.stringify(walletData, null, 2));
}



