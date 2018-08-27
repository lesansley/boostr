pragma solidity ^0.4.24;

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

contract Boostr {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address=>bool) approval;
        uint approvalCount;
    }

    Request[] public requests;
    bool public stopped = false;
    string public title;
    string public description;
    address private manager;
    uint public minimumContribution;
    mapping(address=>uint) private supplierBalance;
    mapping(address=>bool) private suppliers;
    mapping(address=>bool) private supporters;
    mapping(address=>bool) private approvers;
    uint public approversCount;

    modifier stopInEmergency() {
        require(!stopped, "A circuit breaker has been applied");
        _;
    }

    modifier onlyInEmergency() {
        require(stopped);
        _;
    }

    modifier managerRestricted() {
        require(msg.sender == manager, "Unauthorized access");
        _;
    }
    
    modifier approverRestricted() {
        require(approvers[msg.sender], "Unauthorized access");
        _;
    }

    modifier supplierRestricted() {
        require(suppliers[msg.sender], "Unauthorized access");
        _;
    }
    
    constructor(string bstrTitle, string bstrDescription, uint minimum, address creator) public {
        title = bstrTitle;
        description = bstrDescription;
        manager = creator;
        minimumContribution = minimum;
    }
    
    function getManager() public view returns (address) {
        return manager;
    }
    
    function getApprover(address addr) public view returns (bool) {
        return approvers[addr];
    }
    
    function getSupporter(address addr) public view returns (bool) {
        return supporters[addr];
    }

    function getSuppliers(address addr) public view returns (bool) {
        return suppliers[addr];
    }

    function applyBrake() public managerRestricted payable {
        stopped = true;
    }

    function releaseBrake() public managerRestricted payable {
        stopped = false;
    }

    function contribute() public stopInEmergency payable {
        if (msg.value > 0) {
            supporters[msg.sender] = true;
            if (msg.value > minimumContribution) {
                approvers[msg.sender] = true;
                approversCount++;
            }
        }
    }

    function getSummary() public view returns (string, string, uint, uint, uint, uint, address) {
        return (
            title,
            description,
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            getManager()
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
    
    function createRequest(string reqDescription, uint value, address recipient) public stopInEmergency managerRestricted {
        Request memory newRequest = Request ({
            description: reqDescription,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
        suppliers[recipient] = true;
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require (approvers[msg.sender], "Unauthorized access");
        require (!request.approval[msg.sender], "Unauthorized access");
        request.approval[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public managerRestricted {
        Request storage request = requests[index];
        require (!request.complete, "Request previously fulfilled");
        require (request.approvalCount > approversCount / 2, "Insuffient support");
        request.complete = true;
        supplierBalance[request.recipient] += request.value;
    }
    
    function getSupplierBalance(address supplier) public supplierRestricted view returns (uint balance) {
        return supplierBalance[supplier];
    }

    function supplierWithdraw() public supplierRestricted payable returns (bool success) {
        require(supplierBalance[msg.sender] >= 0, "Insufficient funds");
        require(supplierBalance[msg.sender] >= msg.value, "Insufficient funds");
        uint remainingBal = supplierBalance[msg.sender];
        remainingBal = remainingBal - msg.value;
        supplierBalance[msg.sender] = remainingBal;
        msg.sender.transfer(msg.value);
        return true;
    }
}
