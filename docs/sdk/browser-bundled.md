# Appendix A: Using bundle in a browser

It is possible to use `zktube-soft-launch.js` in a browser directly.

- `ethers@5.0` dependency is required for `zktube-soft-launch.js` to work.

> Example with zktube-soft-launch@0.0.13 fetched from [https://unpkg.com](https://unpkg.com) CDN

```html
<html>
  <body>
    <script type="text/javascript" src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/browse/zktube-soft-launch@0.0.13/build/index.js"></script>
    <script type="text/javascript">
      (async () => {
        const ethWallet = ethers.Wallet.createRandom();

        const zksProvider = await zktube.getDefaultProvider('rinkeby');
        const zkTubeWallet = await zktube.Wallet.fromEthSigner(ethWallet, zksProvider);
        console.log('ETH balance:', (await zkTubeWallet.getBalance('ETH')).toString());

        const privateKey = await zktube.crypto.privateKeyFromSeed(new Uint8Array(32));
        const pubkeyHash = await zktube.crypto.privateKeyToPubKeyHash(privateKey);
        console.log('PrivateKey', ethers.utils.hexlify(privateKey), 'PubkeyHash', pubkeyHash);
      })();
    </script>
  </body>
</html>
```
