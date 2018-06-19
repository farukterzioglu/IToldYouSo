import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../../util/web3.service";
import { IToldUSoService } from "../itolduso.service";
import { Saying } from "../saying";
import { tryParse } from 'selenium-webdriver/http';

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
    await this.drawSayings();
    await this.updateSayings();

    this.iToldUSoService.newSayingObservable.subscribe((saying : Saying) => {
      this.sayings.unshift(saying);  
    });
  }

  async drawSayings() : Promise<void>{
    this.sayings = new Array<Saying>();

    let count : number = await this.iToldUSoService.getSayingCount();
    
    for (let index = count -1 ; index >= 0; index--) {
      let saying =await this.iToldUSoService.getSaying(index);
      this.sayings.push(saying);
    }
  }

  async updateSayings() : Promise<void>{
    let funcBase = (error : Error, result) => {
      if(!result) return;

      let hash = this.iToldUSoService.toAscii(result.args.textHash);
      let address = result.args.whoTold;
        
      let sayingFound : Saying = 
        this.sayings.filter( x => 
          x.hash == hash && 
          x.address == address)[0];
      
      if(!sayingFound) return;
      sayingFound.text = this.iToldUSoService.toAscii(result.args.text);
    };

    let func = (error : Error, results) =>{
      for (let index = 0; index < results.length; index++) {
        // funcBase(null, results[index]);
        //TODO : for demostration, remove timeout at prod
        setTimeout(() => { funcBase(null, results[index]); }, (results.length - index) * 500);
      }
    };

    this.iToldUSoService.subscribeToLogTold(funcBase);
    this.iToldUSoService.queryAllLogTolds(func);
  }

}
