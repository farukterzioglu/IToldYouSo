pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IToldUSo.sol";

contract TestIToldUSo{
    IToldUSo instance = IToldUSo(DeployedAddresses.IToldUSo());

    function testHashLenght() public{
        bytes32 texthash = "123";
        instance.told(texthash, "text");
    }

    function testShouldVerify() public{
        bytes32 texthash = "123";
        bool actual = instance.verify(1, texthash, this);
        Assert.equal(actual, true, "Didn't verify hashes!");
    }

    function testShould_Not_Verify() public{
        bool actual = instance.verify(1, "", this);
        Assert.equal(actual, false, "Hashes shouldn't be verified!");
    }
}