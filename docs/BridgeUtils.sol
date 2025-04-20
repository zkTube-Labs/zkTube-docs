// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BridgeUtils {
    
    function hashTransactionData(
        uint256 _chainId,
        address _contractL2,
        uint256 _l2Value,
        bytes calldata _calldata,
        uint256 _l2GasLimit,
        uint256 _l2GasPerPubdataByteLimit,
        bytes[] calldata _factoryDeps,
        address _refundRecipient
    ) public pure returns (bytes32) {
        return keccak256(
            abi.encode(
                _chainId,
                _contractL2,
                _l2Value,
                _calldata,
                _l2GasLimit,
                _l2GasPerPubdataByteLimit,
                _factoryDeps,
                _refundRecipient
            )
        );
    }

    function verifySignature(
        bytes32 _hash,
        bytes memory _signature,
        address _signer
    ) public pure returns (bool) {
        bytes32 ethSignedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)
        );
        return recoverSigner(ethSignedHash, _signature) == _signer;
    }

    function recoverSigner(bytes32 _ethSignedHash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedHash, v, r, s);
    }

    function splitSignature(bytes memory _sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(_sig.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(_sig, 32))
            s := mload(add(_sig, 64))
            v := byte(0, mload(add(_sig, 96)))
        }
    }

    function validateTransaction(
        uint256 _amount,
        uint256 _minAmount
    ) public pure returns (bool) {
        require(_amount >= _minAmount, "Amount is less than the minimum required");
        return true;
    }

    function calculateFee(uint256 _amount, uint256 _feeRate) public pure returns (uint256) {
        return (_amount * _feeRate) / 10000; // Assuming fee rate is provided in basis points (e.g., 1% = 100 basis points)
    }

    function convertEthToWei(uint256 _amountInEth) public pure returns (uint256) {
        return _amountInEth * 1e18;
    }

    function convertWeiToEth(uint256 _amountInWei) public pure returns (uint256) {
        return _amountInWei / 1e18;
    }
}
