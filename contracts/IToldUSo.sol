pragma solidity ^0.4.17;

contract IToldUSo{

    struct Saying{
        uint blockCount;
        bytes8 textHash;
        address teller;
    }

    uint sayingsCount = 0;
    mapping(uint => bytes8) sayings;

    //Privates 
    uint16 hashLength = 20;
    uint16 textLength = 140;
    
    //Events 
    event LogTold(
        uint256 blockCount, bytes8 textHash, 
        address whoTold, string text);

    //Modifiers
    modifier validSaying(uint id) {
        require(id >= 0 && id < sayingsCount);
        _;
    }

    function told(bytes8 textHash, string text) external {
        sayings[++sayingsCount] = textHash;

        emit LogTold(block.number,  textHash, msg.sender, text);
    }
    
    function getSaying(uint id) validSaying(id) public view returns (bytes8) { // (uint, bytes8, address){
        bytes8 saying = sayings[id];
        return saying ; //(saying.blockCount, saying.textHash, saying.teller);
    }

    function getSayingCount() external view returns(uint){
        return sayingsCount;
    }

    // function verify(uint32 blockCount, bytes20 textHash, address teller) external view returns(bool){
    //     require(blockCount > 0);
    //     require(teller != 0x0); //TODO : ?? 

    //     for (uint i = 0; i < sayings.length; i++) {
    //         if (
    //             (sayings[i].teller == teller) &&
    //             (sayings[i].textHash == textHash) &&
    //             (sayings[i].blockCount == blockCount)
    //         ) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    function () payable public {
    }
}