pragma solidity ^0.4.17;

contract IToldUSo{

    mapping(bytes32 => address) textHashToOwner;
    
    //Events 
    event LogTold(address whoTold, bytes32 textHash, string text);

    function told(bytes32 textHash, string text) public {
        // require(text.lenght < 140);
        // require(textHash.lenght == 20); //???

        textHashToOwner[textHash] = msg.sender;
        emit LogTold(msg.sender, textHash, text);
    }

    function verify(bytes32 textHash, address teller) public view returns(bool){
        return textHashToOwner[textHash] == teller;
    }
}