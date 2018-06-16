import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../../util/web3.service";
import { IToldUSoService } from "../itolduso.service";
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
    private iToldUSoService : IToldUSoService,
    private web3Service : Web3Service
  ) { }

  async ngOnInit() {
    this.drawSayings();
  }

  async drawSayings(){
    this.sayings = [
      { address : "123", text : "asd", hash : "xxx", timestamp : "1"},
      { address : "456", text : "qwe", hash : "yyy", timestamp : "2"}
    ];

    let count : number = await this.iToldUSoService.getSayingCount();
    console.log(`Count : ${count}`);
  }
}
