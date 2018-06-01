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

    //Events 
    event LogTold(
        uint32 blockCount, bytes32 textHash, 
        address whoTold, string text);

    function told(bytes32 textHash, string text) external {
        // require(text.lenght < 140);
        // require(textHash.lenght == 20); //???

        uint32 blockCount = 1; //TODO : Get block count  
        uint id = sayings.push(Saying(blockCount, textHash, msg.sender)) - 1;
        sayingToOwner[id] = msg.sender;

        // emit LogTold(blockCount,  textHash, msg.sender, text);
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