import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { IToldUSoService } from '../itolduso.service';
import { Saying } from '../saying';
import { tryParse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-sayings',
  templateUrl: './sayings.component.html',
  styleUrls: ['./sayings.component.css']
})
export class SayingsComponent implements OnInit {
  IToldUYouSo: any;
  sayings: Saying[];
  account: string;

  constructor(
    private iToldUSoService: IToldUSoService,
    private web3Service: Web3Service
  ) {
    this.sayings = new Array<Saying>();
  }

  async ngOnInit() {
    await this.drawSayings();
    await this.updateSayings();

    this.iToldUSoService.newSayingObservable.subscribe((saying: Saying) => {
      this.sayings.unshift(saying);
    });
  }

  async drawSayings(): Promise<void> {
    this.sayings = new Array<Saying>();

    const count: number = await this.iToldUSoService.getSayingCount();

    for (let index = count - 1 ; index >= 0; index--) {
      const saying = await this.iToldUSoService.getSaying(index);
      this.sayings.push(saying);
    }
  }

  async updateSayings(): Promise<void> {
    const funcBase = (error: Error, result) => {
      if (!result) { return; }

      const hash = this.iToldUSoService.toAscii(result.args.textHash);
      const address = result.args.whoTold;

      const sayingFound: Saying =
        this.sayings.filter( x => x.hash === hash)[0];

      if (!sayingFound) { return; }
      sayingFound.text = this.iToldUSoService.toAscii(result.args.text);
      sayingFound.blockCount = result.blockNumber;
      sayingFound.address = result.args.whoTold;
    };

    const func = (error: Error, results) => {
      for (let index = 0; index < results.length; index++) {
        // funcBase(null, results[index]);
        // TODO : for demostration, remove timeout at prod
        setTimeout(() => { funcBase(null, results[index]); }, (results.length - index) * 500);
      }
    };

    this.iToldUSoService.subscribeToLogTold(funcBase);
    this.iToldUSoService.queryAllLogTolds(func);
  }

}
