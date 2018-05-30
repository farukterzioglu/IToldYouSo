pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IToldUSo.sol";

contract TestIToldUSo{
    IToldUSo instance = IToldUSo(DeployedAddresses.IToldUSo());

    function testHashLenght() public{
        string memory texthash = "123";
        instance.told(texthash, "text");
    }

    function testShouldVerify() public{
        string memory texthash = "123";
        bool actual = instance.verify(texthash, this) ;
        Assert.equal(actual, true, "Didn't verify hashes!");
    }

    function testShould_Not_Verify() public{
        bool actual = instance.verify("", this) ;
        Assert.equal(actual, false, "Hashes shouldn't be verified!");
    }
}