# Getting started

In this tutorial we will demonstrate how to:

1. Connect to the zkTube network.
1. Deposit assets from Ethereum into zkTube.
1. Make transfers.
1. Withdraw funds back to Ethereum mainnet.

## Adding dependencies

```bash
yarn add zktube-soft-launch
yarn add ethers # ethers is a peer dependency of zktube-soft-launch
```

See [Appendix A](browser-bundled.md) for how to add library to web project directly from
[https://unpkg.com](https://unpkg.com) CDN.

## Adding imports

You can import all the content of the zkTube library with the following statement:

```typescript
import * as zktube from 'zktube-soft-launch';
```

Note, that it is not actually required to import all of the library. For instance, if you only need the Wallet class,
you can safely do

```typescript
import { Wallet } from 'zktube-soft-launch';
```

But in the rest of the book we will assume that the library was imported the first way to differentiate content imported
from the zktube and ethers libraries.

## Connecting to zkTube network

To interact with zkTube network users need to know the endpoint of the operator node.

```typescript
const syncProvider = await zktube.getDefaultProvider('rinkeby');
```

Most operations require some read-only access to the Ethereum network. We use `ethers` library to interact with
Ethereum.

```typescript
const ethersProvider = ethers.getDefaultProvider('rinkeby');
```

## Creating a Wallet

To control your account in zkTube, use the `zktube.Wallet` object. It can sign transactions with keys stored in
`zktube.Signer` and send transaction to zkTube network using `zktube.Provider`.

`zktube.Wallet` is a wrapper around 2 objects:

- `ethers.Signer` to sign Ethereum transactions.
- `zktube.Signer` to sign native zkTube transactions.

The private key used by `zktube.Signer` is implicitly derived from Ethereum signature of a special message.

```typescript
// Create ethereum wallet using ethers.js
const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);

// Derive zktube.Signer from ethereum wallet.
const syncWallet = await zktube.Wallet.fromEthSigner(ethWallet, syncProvider);
```

## Depositing assets from Ethereum into zkTube

We are going to deposit `1.0 ETH` to our zkTube account.

```typescript
const deposit = await syncWallet.depositToSyncFromEthereum({
  depositTo: syncWallet.address(),
  token: 'ETH',
  amount: ethers.utils.parseEther('1.0')
});
```

"ETH" stands for native Ether. To transfer supported ERC20 token use ERC20 address or ERC20 symbol instead of "ETH".

After the tx is submitted to the Ethereum node, we can track its status using the returned object:

```typescript
// Await confirmation from the zkTube operator
// Completes when a promise is issued to process the tx
const depositReceipt = await deposit.awaitReceipt();

// Await verification
// Completes when the tx reaches finality on Ethereum
const depositReceipt = await deposit.awaitVerifyReceipt();
```

## Unlocking zkTube account

To control assets in zkTube network, an account must register a separate public key once.

```typescript
if (!(await syncWallet.isSigningKeySet())) {
  if ((await syncWallet.getAccountId()) == undefined) {
    throw new Error('Unknown account');
  }

  // As any other kind of transaction, `ChangePubKey` transaction requires fee.
  // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkTube node for
  // the lowest possible amount.
  const changePubkey = await syncWallet.setSigningKey({
    feeToken: 'ETH',
    ethAuthType: 'ECDSA'
  });

  // Wait until the tx is committed
  await changePubkey.awaitReceipt();
}
```

## Checking zkTube account balance

```typescript
// Committed state is not final yet
const committedETHBalance = await syncWallet.getBalance('ETH');

// Verified state is final
const verifiedETHBalance = await syncWallet.getBalance('ETH', 'verified');
```

To list all tokens of this account at once, use `getAccountState`:

```typescript
const state = await syncWallet.getAccountState();

const committedBalances = state.committed.balances;
const committedETHBalance = committedBalances['ETH'];

const verifiedBalances = state.verified.balances;
const committedETHBalance = verifiedBalances['ETH'];
```

## Making a transfer in zkTube

Now, let's create a second wallet and transfer some funds into it. Note that we can send assets to any fresh Ethereum
account, without preliminary registration!

```typescript
const ethWallet2 = ethers.Wallet.fromMnemonic(MNEMONIC2).connect(ethersProvider);
const syncWallet2 = await zktube.SyncWallet.fromEthSigner(ethWallet2, syncProvider);
```

We are going to transfer `0.999 ETH` to another account and pay `0.001 ETH` as a fee to the operator (zkTube account
balance of the sender is going to be decreased by `0.999 + 0.001 ETH`). The use of `closestPackableTransactionAmount()`
and `closestPackableTransactionFee()` is necessary because the precision of transfer in zkTube is limited (see docs
below).

```typescript
const amount = zktube.utils.closestPackableTransactionAmount(ethers.utils.parseEther('0.999'));
const fee = zktube.utils.closestPackableTransactionFee(ethers.utils.parseEther('0.001'));

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: 'ETH',
  amount,
  fee
});
```

Note that setting fee manually is not required. If `fee` field is omitted, SDK will choose the lowest possible fee
acceptable by server:

```typescript
const amount = zktube.utils.closestPackableTransactionAmount(ethers.utils.parseEther('0.999'));

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: 'ETH',
  amount
});
```

To track the status of this transaction:

```typescript
const transferReceipt = await transfer.awaitReceipt();
```

## Withdrawing funds back to Ethereum

```typescript
const withdraw = await syncWallet2.withdrawFromSyncToEthereum({
  ethAddress: ethWallet2.address,
  token: 'ETH',
  amount: ethers.utils.parseEther('0.998')
});
```

Assets will be withdrawn to the target wallet after the zero-knowledge proof of zkTube block with this operation is
generated and verified by the mainnet contract.

We can wait until ZKP verification is complete:

```typescript
await withdraw.awaitVerifyReceipt();
```
