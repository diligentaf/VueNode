// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @dev Elliptic Curve Digital Signature Algorithm (ECDSA) operations.
 *
 * These functions can be used to verify that a message was signed by the holder
 * of the private keys of a given address.
 */

contract LinkDropTest {
    using ECDSA for bytes32;

    struct Link {
        string campaignID;
        uint256 id;
        uint256 balance;
        address pubwallet;
        bool taken;
        uint256 time;
        bytes32 puzzle;
    }

    bool public running;

    uint256 public startTime;

    uint256 public duration;

    uint256 public endTime;

    address payable public client;

    address public validator;

    string public campaignID;

    mapping(uint256 => Link) public links;

    uint256 public linkCount;

    uint256 public cost;

    uint256 public initialSupply;

    uint256 public num;

    uint256 public costPerNum;

    uint256 public generatedLinkCount;

    IERC20 public token;

    string public randomString;

    constructor(
        address _token,
        address payable _client,
        uint256 _duration,
        uint256 _cost,
        uint256 _num,
        string memory _campaignID
    ) public {
        token = IERC20(_token);
        client = _client;
        cost = _cost;
        initialSupply = _cost;
        num = _num;
        costPerNum = _cost / _num;
        validator = msg.sender;
        campaignID = _campaignID;
        duration = _duration * 60 * 60 * 24;
        startTime = block.timestamp;
        endTime = startTime + duration;
        running = true;
    }

    function isValidSignature(uint256 nuu, bytes calldata signature)
        public
        view
        returns (bool)
    {
        return
            links[nuu].puzzle.toEthSignedMessageHash().recover(signature) ==
            address(validator);
    }

    function createMultipleLinks() public {
        for (uint256 i = 0; i < num; i++) {
            addLink();
        }
    }

    function addLink() public {
        links[linkCount] = Link(
            campaignID,
            linkCount,
            costPerNum,
            address(0),
            false,
            0,
            keccak256(
                abi.encodePacked(
                    string.concat(
                        Strings.toString(linkCount),
                        Strings.toString(costPerNum),
                        campaignID
                    )
                )
            )
        );
        linkCount++;
        cost -= costPerNum;
    }

    // function get(uint256 id) public view returns (Link memory) {
    //     return links[id];
    // }

    function getLinks() public view onlyClient  returns (Link[] memory) {
        Link[] memory id = new Link[](linkCount);
        for (uint256 i = 0; i < linkCount; i++) {
            Link storage link = links[i];
            id[i] = link;
        }
        return id;
    }

    function getLinksFromValidator() public onlyValidator view returns (bool[] memory) {
        bool[] memory boolList = new bool[](linkCount);
        for (uint256 i = 0; i < linkCount; i++) {
            boolList[i] = links[i].taken;
        }
        return boolList;
    }

    function getLinksByIndexFromValidator(uint256 nu) public onlyValidator view returns (bool) {
        return links[nu].taken;
    }

    function pauseCampaign() public onlyClient {
        running = false;
    }

    function runCampaign() public onlyClient {
        running = true;
    }

    function cancelCampaign() public onlyClient {
        uint256 amount = token.balanceOf(address(this));
        token.transfer(client, amount);
        running = false;
    }

    function airdrop(
        uint256 _id,
        uint256 _balance,
        address _user,
        bytes calldata _signature
    ) public onlyValidator {
        require(endTime > block.timestamp, "timestamp exceeds expiration date");
        require(links[_id].taken == false);
        require(links[_id].balance == _balance);
        require(running == true);
        require(isValidSignature(_id, _signature) == true);
        token.transfer(_user, links[_id].balance);
        links[_id].taken = true;
        links[_id].balance = 0;
        links[_id].pubwallet = _user;
    }

    function fundContract(uint256 _fundingAmount) external onlyClient {
        token.transferFrom(msg.sender, address(this), _fundingAmount);
    }

    modifier onlyValidator() {
        require(msg.sender == validator, "not validator");
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client, "not client");
        _;
    }

    modifier onlyExecs() {
        require(msg.sender == client || msg.sender == validator, "not execs");
        _;
    }
}
