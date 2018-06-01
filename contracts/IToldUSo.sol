pragma solidity ^0.4.17;

contract IToldUSo{

    struct Saying{
        uint32 blockCount;
        bytes32 textHash;
        address teller;
    }

    Saying[] public sayings;
    mapping(uint => address) sayingToOwner;
    mapping(address => uint) ownerSayingCount;

    //Privates 
    uint16 hashLength = 20;
    uint16 textLength = 140;
    
    //Events 
    event LogTold(
        uint32 blockCount, bytes32 textHash, 
        address whoTold, string text);

    //Modifiers
    modifier validSaying(uint id) {
        require(id >= 0 && id < sayings.length);
        _;
    }

    function told(bytes32 textHash, bytes32 text) external {
        // require(text.length <= textLength);
        // require(textHash.length == hashLength); 

        uint32 blockCount = 1; //TODO : Get block count  
        uint id = sayings.push(Saying(blockCount, textHash, msg.sender)) - 1;
        sayingToOwner[id] = msg.sender;

        // emit LogTold(blockCount,  textHash, msg.sender, text);
    }
    
    function getSaying(uint id) validSaying(id) public view returns (uint32, bytes32, address){
        Saying memory saying = sayings[id];
        return (saying.blockCount, saying.textHash, saying.teller);
    }

    function getSayingCount() external view returns(uint){
        return sayings.length;
    }

    function verify(uint32 blockCount, bytes32 textHash, address teller) external view returns(bool){
        for (uint i = 0; i < sayings.length; i++) {
            if (
                (sayings[i].teller == teller) &&
                (sayings[i].textHash == textHash) &&
                (sayings[i].blockCount == blockCount)
            ) {
                return true;
            }
        }
        return false;
    }
}