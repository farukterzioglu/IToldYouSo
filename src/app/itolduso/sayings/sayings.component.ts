import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../../util/web3.service";
import { IToldUSoService } from "../itolduso.service";
import { Saying } from "../saying";

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

    this.iToldUSoService.newSayingObservable.subscribe((saying : Saying) => {
      this.sayings.unshift(saying);  
    });
  }

  async drawSayings(){
    this.sayings = new Array<Saying>();

    let count : number = await this.iToldUSoService.getSayingCount();
    
    for (let index = count -1 ; index >= 0; index--) {
      let saying =await this.iToldUSoService.getSaying(index);
      this.sayings.push(saying);  
    }
  }
}
