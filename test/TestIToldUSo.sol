pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "./ThrowProxy.sol";
import "../contracts/IToldUSo.sol";

contract TestIToldUSo{
    IToldUSo instance = IToldUSo(DeployedAddresses.IToldUSo());
    ThrowProxy throwProxy = new ThrowProxy(address(instance));
    IToldUSo throwableIToldUSo = IToldUSo(address(throwProxy));


    bytes32 texthash = "12345678901234567890";

    function testHashLenght() public {
        instance.told(texthash, "text");
    }

    function testShouldVerify() public {
        bool actual = instance.verify(1, texthash, this);
        Assert.equal(actual, true, "Didn't verify hashes!");
    }

    function testShouldNotVerify() public {
        bool actual = instance.verify(1, "", this);
        Assert.equal(actual, false, "Hashes shouldn't be verified!");
    }

    function testShouldGetCount() public {
        bytes32 texthash = "123";
        instance.told(texthash, "text");
        instance.told(texthash, "text");

        uint result = instance.getSayingCount();
        Assert.equal(result, 3, "Count should match.");
    }

    function testShouldThrowIfHashNot20(){
        // address(throwableIToldUSo).call(abi.encodeWithSignature("told(bytes32, bytes32)", "1Def4Rt21", "Test"));
        // throwProxy.shouldThrow();
    }
}