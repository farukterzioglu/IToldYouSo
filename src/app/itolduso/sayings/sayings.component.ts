import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../../util/web3.service";
import { IToldUSoContractService } from "../itolduso.service";
import { Saying } from "../saying";

declare let require: any;
const contractArtifacts = require("../../../../build/contracts/IToldUSo.json");

@Component({
  selector: 'app-sayings',
  templateUrl: './sayings.component.html',
  styleUrls: ['./sayings.component.css']
})
export class SayingsComponent implements OnInit {
  IToldUYouSo: any;
  sayings : Saying[];
  account : string;

  constructor(
    private iToldUSoContractService : IToldUSoContractService,
    private web3Service : Web3Service
  ) { }

  async ngOnInit() {
    this.sayings = [
      { address : "123", text : "asd", hash : "xxx", timestamp : "1"},
      { address : "456", text : "qwe", hash : "yyy", timestamp : "2"}
    ];

    this.watchAccount();
    this.drawSayings();
  }

  watchAccount() {
    this.iToldUSoContractService.accountsObservable.subscribe((accounts) => {
      console.log(`Account changed : ${accounts[0]}"`);

      this.account = accounts[0];
      this.drawSayings();
    });
  }

  async drawSayings(){
    let count : number = await this.iToldUSoContractService.getSayingCount();
    console.log(`Count : ${count}`);
    // this.web3Service.getAccounts((err, accs) => {
		// 	if (err != null) {
    //     console.warn('There was an error fetching your accounts.');
    //     return;
		// 	}
      
    //   console.log(accs);
		// });
  }
}
