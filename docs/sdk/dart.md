# Dart SDK

## Getting started

1. Connect to the zktube network.
2. Deposit assets from Ethereum into zktube.
3. Transferring funds.
4. Withdraw funds back to Ethereum mainnet (or testnet).

### Adding dependencies

Adding this SDK as a dependency into your app build configuration


```yaml=
name: <your_app_name>
...
environment:
  sdk: '>=2.12.0 <3.0.0'
dependencies:
  zktlib:
    git:
      url: git@github.com:zkTube-Labs/zktLib.git
  ...
```

Native library is precompiled for the following platforms:

##### Android

- Arm64-v8a
- Armeabi-v7a
- x86
- x86_64

##### iOS

- i386
- x86_64

### Imports

Client library is divided into three separate packages. Add requirements into `imports` block of your main file;

```dart
import 'package:zktlib/client.dart';
import 'package:zktlib/credentials.dart';
import 'package:zktlib/zktlib.dart';
```

### Creating signers

All messages in zktube network must be signed by the private key. There are two keys required: Level 1 (L1) for Ethereum and Level 2 (L2) for zktube network.

To operate in zktube network you need to create `ZktSigner` instance first. There are a few ways to create it:

Using seed bytes (like MNEMONIC phrase) with the length >= 32

```dart
final zktSigner = ZktSigner.seed(SEED);
```

Using raw private key

```dart
final rawPrivateKey = hex.decode('0x...');
final zktSigner = ZktSigner.raw(rawPrivateKey);
```

Using raw private key in hex

```dart
final zktSigner = ZktSigner.hex('0x...');
```

Using EthSigner (explained below). The private key used by ZktSigner is implicitly derived by signing a special message with Ethereum L1 key.

```dart
final ethSigner = ...;
final zktSigner = await ZktSigner.fromEthSigner(ethSigner, ChainId.Rinkeby);
```

---

To interact with Ethereum L1 chain (to make a `Deposit` or `Withdraw` funds), you'll need `EthSigner` instance. It can be instantiated in several different ways:

Using raw private key in hex

```dart
final ethSigner = EthSigner.hex(privateKey, chainId: ChainId.Rinkeby.getChainId());
```

Using raw private key

```dart
final rawPrivateKey = hex.decode('0x...');
final ethSigner = EthSigner.raw(privateKey);
```

Using `Credentials` from Web3dart

```dart
import 'package:web3dart/web3dart.dart' as web3;
```

```dart
final credentials = web3.EthPrivateKey.fromHex(hexKey);
```

### Connecting to zktube network

In order to interact with both zktube and Ethereum networks you'll need to create providers and provide endpoints to blockchain nodes

#### zktube client

```dart
import 'package:http/http.dart';
```

```dart
final zktClient = ZktClient('http://localhost:3030', Client());
```

#### Ethereum client

For onchain operations in Ethereum network you can use `EthereumClient`

```dart
final ethSigner = ...;
final ethereum =
      EthereumClient('http://localhost:8545', ethSigner.credentials, ChainId.Rinkeby);
```

### Creating a Wallet

To control and operate with your account in zktube you can use the `Wallet`. It can sign transactions with the key stored in `ZktSigner` and `EthSigner`, then send signed transactions into zktube network using `ZktClient`.

```dart
final ethSigner = ...;
final zktSigner = ...;
final ethClient = ...;
final zktClient = ...;
final wallet = Wallet(zktClient, ethClient, zktSigner, ethSigner);
```

### Depositing assets from Ethereum into zktube

In order to deposit assets from Ethereum network into zktube please use the following sequence:

```dart
final ethSigner = ...;
final ethClient = ...;
final receiver = ...;
final depositTx = await ethClient.deposit(Token.eth,
      EtherAmount.fromUnitAndValue(EtherUnit.ether, 1).getInWei, receiver);
```

### Checking your zktube balance

In order to check your account balance in zktube network please use the following commands:

```dart
final wallet = ...;
final state = await wallet.getState();
final balance = state.commited.balances['ETH'];
```

### Unlocking zktube account

In order to make any transactions in zktube network, you'll need to register your ZktSigner's public key first. Please use the following command to do this: 

```dart
final zktSigner = ...;
final wallet = ...;
final authTx = await wallet.setSigningKey(
      ZktPubkeyHash.fromHex(zktSigner.publicKeyHash),
      token: Token.eth);
print(authTx);
```

### Transfering funds in zktube

After fund are `Deposited` and account is `Unlocked`, you can transfer funds in the zktube network. 

> Please note, that it is possible to send assets within zktube to any Ethereum address, without preliminary registration in zktube!

```dart
final wallet = ...;
final receiver =
      EthereumAddress.fromHex('0x...');
final tx = await wallet.transfer(
      receiver, EtherAmount.fromUnitAndValue(EtherUnit.eth, 0.1).getInWei,
      token: Token.eth);
print(tx);
```

### Withdrawing funds back to Ethereum

All your funds can be withdrawn back to any of your accounts in the Ethereum network. Please use the following commands:

```dart
final wallet = ...;
final withdrawTx = await wallet.withdraw(
      receiver, EtherAmount.fromUnitAndValue(EtherUnit.eth, 0.5).getInWei,
      token: Token.eth);
print(withdrawTx);
```

Assets will be withdrawn to the target address after a zero-knowledge proof of zktube block with this operation is generated and verified by the mainnet contract .


