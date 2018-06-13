import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../../util/web3.service";

@Component({
  selector: 'told-something',
  templateUrl: './told-something.component.html',
  styleUrls: ['./told-something.component.css']
})
export class ToldSomethingComponent implements OnInit{
  
  sayingText :string;
  hashedText : string | number; 

  constructor(private web3Service : Web3Service){}

  ngOnInit(): void {
    console.log("Init : ToldSomethingComponent"); 
  }

  getHash(term : string): void {
    this.sayingText = term;
    this.hashedText = this.hashFnv32a(term, true, undefined);
  }
  
  iToldYou(): void {
    console.log(`${this.sayingText} - ${this.hashedText}`);

    // web3.eth.getAccounts(function(error, accounts){
    //     if(error){ console.log(error); }
    
    //     var account = accounts[0];
    
    //     App.contracts.IToldUSo.deployed()
    //     .then(function(iToldUSoInstance){
    //       console.log(text + "," + textHash);

    //       return iToldUSoInstance.told(textHash, text, {from: account});
    //     })
    //     .then(function(result){
    //         console.log(result);
    //         setTimeout(function() {
    //           console.log("Listing sayings...");
    //           App.listSayings();
    //         }, 6000);
    //     }).catch(function(err) {
    //         console.error(err.message);
    //     });
    // });
  }
 
  private hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;
  
    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
  }    
}