import { Component, OnInit } from '@angular/core';
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

  constructor(private iToldUSoContractService : IToldUSoContractService) { }

  async ngOnInit() {
    await this.iToldUSoContractService.initializeContract();

    let count : number = await this.iToldUSoContractService.getSayingCount();
    console.log(`Count : ${count}`);

    this.sayings = [
      { address : "123", text : "asd", hash : "xxx", timestamp : "1"},
      { address : "456", text : "qwe", hash : "yyy", timestamp : "2"}
    ];
  }
}
