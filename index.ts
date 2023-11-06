import {
  http,
  createWalletClient,
  custom,
  Account,
  Transport,
  WalletClient,
} from 'viem';
import { commitName } from '@ensdomains/ensjs/wallet';
import { addEnsContracts, createEnsPublicClient } from '@ensdomains/ensjs';
import { mainnet } from 'viem/chains';
import { randomSecret } from '@ensdomains/ensjs/utils';

const wallet = createWalletClient({
  transport: http('https://rpc.ankr.com/eth'),
  account: custom(window.ethereum),
});

const name = 'testing.eth';

const ONE_YEAR = 365 * 24 * 60 * 60;

const ensClient = createEnsPublicClient({
  chain: mainnet,
  transport: http('https://web3.ens.domains/v1/mainnet'),
});

const mainnetWithEns = addEnsContracts(mainnet);

const test = () => {
  const secret = randomSecret();
  commitName(
    wallet as WalletClient<Transport, typeof mainnetWithEns, Account>,
    {
      name,
      duration: ONE_YEAR,
      owner: wallet.account.address,
      secret,
      gas,
    }
  );
};
