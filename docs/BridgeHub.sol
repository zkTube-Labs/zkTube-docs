// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BridgeHub {
    struct Chain {
        uint256 chainId;
        address stateTransition;
    }

    mapping(uint256 => Chain) public chains;
    mapping(address => bool) public admins;

    event NewChain(uint256 chainId, address stateTransition);
    event NewStateTransition(address stateTransition);
    event RequestL2Transaction(
        uint256 chainId,
        address contractL2,
        uint256 l2Value,
        bytes calldata,
        uint256 l2GasLimit,
        uint256 l2GasPerPubdataByteLimit,
        bytes[] factoryDeps,
        address refundRecipient
    );

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can call this function");
        _;
    }

    constructor() {
        admins[msg.sender] = true;
    }

    function addAdmin(address _admin) external onlyAdmin {
        admins[_admin] = true;
    }

    function newChain(uint256 _chainId, address _stateTransition) external onlyAdmin returns (uint256 chainId) {
        require(chains[_chainId].chainId == 0, "Chain already exists");
        chains[_chainId] = Chain(_chainId, _stateTransition);
        emit NewChain(_chainId, _stateTransition);
        return _chainId;
    }

    function newStateTransition(address _stateTransition) external onlyAdmin {
        emit NewStateTransition(_stateTransition);
    }

    function requestL2Transaction(
        uint256 _chainId,
        address _contractL2,
        uint256 _l2Value,
        bytes calldata _calldata,
        uint256 _l2GasLimit,
        uint256 _l2GasPerPubdataByteLimit,
        bytes[] calldata _factoryDeps,
        address _refundRecipient
    ) public payable returns (bytes32 canonicalTxHash) {
        // Implementation for requesting L2 transaction
        emit RequestL2Transaction(
            _chainId,
            _contractL2,
            _l2Value,
            _calldata,
            _l2GasLimit,
            _l2GasPerPubdataByteLimit,
            _factoryDeps,
            _refundRecipient
        );
        // Return a dummy transaction hash for illustration purposes
        return keccak256(abi.encodePacked(_chainId, _contractL2, _l2Value, _calldata));
    }
}
