pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "./ThrowProxy.sol";
import "../contracts/IToldUSo.sol";

contract TestIToldUSo{
    IToldUSo instance = IToldUSo(DeployedAddresses.IToldUSo());
    ThrowProxy throwProxy = new ThrowProxy(address(instance));
    IToldUSo throwableIToldUSo = IToldUSo(address(throwProxy));


    bytes32 texthash = "123456789012345678901234567890";

    function testHashLenght() public {
        instance.told(texthash, "text");
    }

    function testShouldVerify() public {
        //TODO : test block number, replace '1'
        instance.told(texthash, "text");        
        bool actual = instance.verify(1, texthash, this);
        Assert.equal(actual, true, "Didn't verify hashes!");
    }

    function testShouldNotVerify() public {
        bool actual = instance.verify(1, "wrongtext", this);
        Assert.equal(actual, false, "Hashes shouldn't be verified!");
    }

    function testShouldGetCount() public {
        bytes32 texthash = "123";
        instance.told(texthash, "text");
        instance.told(texthash, "text");

        uint result = instance.getSayingCount();
        Assert.equal(result, 4, "Count should match.");
    }

    //TODO : after implementing hash size check 
    // function testShouldThrowIfHashNot20(){
    //     address(throwableIToldUSo).call(abi.encodeWithSignature("told(bytes32, string)", "1Def4Rt21", "Test"));
    //     throwProxy.shouldThrow();
    // }
}