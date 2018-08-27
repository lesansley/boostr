pragma solidity ^0.4.24;

import "./Boostr.sol";

contract BoostrFactory {
    address[] private deployedBoostrs;

    function createBoostr(string title, string description, uint minimum) public {
        address newBoostr = new Boostr(title, description, minimum, msg.sender);
        deployedBoostrs.push(newBoostr);
    }

    function getAllBoostrs() public view returns (address[]) {
        return deployedBoostrs;
    }
}
