
const { Account } = require('@near-js/accounts');
const { KeyPair, PublicKey } = require('@near-js/crypto');
const { InMemoryKeyStore } = require('@near-js/keystores');
const { JsonRpcProvider } = require('@near-js/providers');
const { InMemorySigner } = require('@near-js/signers');
const { actionCreators } = require('@near-js/transactions');
const BN = require('bn.js');
const nearAPI = require('near-api-js');
const dotenv = require("dotenv");
dotenv.config();
const { signedDelegate } = actionCreators;
const keyStore = new InMemoryKeyStore();

const instatiateAccount = async (network, accountName, pk) => {
  const relayerKeyStore = await authenticatedKeyStore(network, accountName, pk);

  return await connects(accountName, relayerKeyStore, network);
};

const authenticatedKeyStore = async (network, account, pk)=> {
  await keyStore.setKey(network, account, KeyPair.fromString(pk));

  return keyStore;
};

const randomKeyStore = async (network, account) => {
  const kp = KeyPair.fromRandom('ed25519');
  await keyStore.setKey(network, account, kp);

  return keyStore;
};

const connects = async (accountId, keyStore, network = 'mainnet') => {
  const provider = new JsonRpcProvider({
    url: network == 'mainnet' ? 'https://rpc.mainnet.near.org' : 'https://rpc.testnet.near.org',
  });

  const signer = new InMemorySigner(keyStore);
  const config = {
    networkId: network,
    provider,
    signer,
    jsvmAccountId: '',
  }
  return new Account(
    config,
    accountId,
  );
};

const createAccount = async (implicitAccount, publicKey, network) => {
  const isMainnet = network === 'mainnet';
  const RELAYER_ACCOUNT = isMainnet
    ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET
    : process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET;

  if (!RELAYER_ACCOUNT) {
    throw new Error('Signer details not found in firebase');
  }

  const relayerPrivateKey = isMainnet
    ? (process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET )
    : (process.env.RELAYER_PRIVATE_KEY_NEAR_TESTNET );
  const relayerAccount = await instatiateAccount(network, RELAYER_ACCOUNT, relayerPrivateKey);
  await relayerAccount.createAccount(implicitAccount, PublicKey.fromString(publicKey), BigInt('0'));

};

const submitTransaction = async ({
  network = process.env.NEXT_PUBLIC_NETWORK_ID,
  delegate,
}) => {
  const isMainnet = network === 'mainnet';
  const RELAYER_ACCOUNT = isMainnet
    ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET
    : process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET;

  try {
    const relayerPrivateKey = isMainnet
      ? (process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET )
      : (process.env.RELAYER_PRIVATE_KEY_NEAR_TESTNET );

    if (!RELAYER_ACCOUNT || !relayerPrivateKey) {
      throw new Error('Signer details not found in firebase');
    }
    //Instatiate mintbus account that runs transactions
    const relayerAccount = await instatiateAccount(network, RELAYER_ACCOUNT, relayerPrivateKey);

    const result = await relayerAccount.signAndSendTransaction({
      actions: [signedDelegate(delegate)],
      receiverId: delegate.delegateAction.senderId,

    });

    return result;
  } catch (error) {
    throw error;
  }
};

const fundAccount = async (accountId, network) => {
  const isMainnet = network === 'mainnet';
  const RELAYER_ACCOUNT = isMainnet
    ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET
    : process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET;

  if (!RELAYER_ACCOUNT) {
    throw new Error('Signer details not found in firebase');
  }

  const relayerPrivateKey = isMainnet
    ? (process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET )
    : (process.env.RELAYER_PRIVATE_KEY_NEAR_TESTNET );
  if (!RELAYER_ACCOUNT || !relayerPrivateKey) {
    throw new Error('Signer details not found in firebase');
  }

  try {
    const relayerAccount = await instatiateAccount(network, RELAYER_ACCOUNT, relayerPrivateKey);
    const result = await relayerAccount.sendMoney(accountId, new BN('300000000000000000000'));
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports={
  signedDelegate,
  connects,
  randomKeyStore,
  instatiateAccount,
  fundAccount,
  submitTransaction,
  createAccount
}