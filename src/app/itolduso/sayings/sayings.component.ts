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
  ) { 
    this.sayings = new Array<Saying>();
  }

  async ngOnInit() {
    this.drawSayings();
  }

  async drawSayings(){
    let count : number = await this.iToldUSoService.getSayingCount();
    console.log(`Count : ${count}`);
    
    for (let index = 0; index < count; index++) {
      let saying =await this.iToldUSoService.getSaying(index);
      this.sayings.push(saying);  
      console.log(saying);
    }
  }
}
