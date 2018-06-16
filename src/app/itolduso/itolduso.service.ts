import { Web3Service } from "../util/web3.service";
import { Injectable } from "@angular/core";
import { Saying } from "./saying";
import { Observable, Subject } from "rxjs";
import { tryParse } from "selenium-webdriver/http";

declare let require: any;
const contractArtifacts = require("../../../build/contracts/IToldUSo.json");

@Injectable({providedIn: 'root'})
export class IToldUSoService{
	IToldUYouSo: any;
  sayings : Saying[];
	initializing : boolean;
	account : any;

  public accountsObservable = new Subject<string[]>();

	constructor(private web3Service : Web3Service){
		this.accountsObservable = this.web3Service.accountsObservable;
		this.watchAccount();
	}
	
	public async initializeContract() : Promise<void>{
		console.log("Invoked 'initializeContract'");

		if(this.IToldUYouSo) {
			console.log("Contract already created.");
			return;
		}

		if(this.initializing) {
			console.log("Contract is being initialized...");

			const delay = new Promise(resolve => setTimeout(resolve, 1000));
      await delay;
      return await this.initializeContract();
		}

		//Initializing...
		this.initializing = true;

		return this.web3Service.artifactsToContract(contractArtifacts)
		.then((abstraction) => {
			this.IToldUYouSo = abstraction;
			console.log("Contract created.");
			this.initializing = false;
    });
	}

	public async getSayingCount() : Promise<number>{
		if(!this.IToldUYouSo) await this.initializeContract();
		
		const deployedContrat = await this.IToldUYouSo.deployed();
		return deployedContrat.getSayingCount.call();
	}

	public async getSaying(index: number): Promise<any> {
		if(!this.IToldUYouSo) await this.initializeContract();

		let contract = await this.IToldUYouSo.deployed();
		let saying = await contract.getSaying.call(index);

		//TODO : Get text by event filtering
		let result : Saying = {
			text : this.web3Service.web3.toAscii(saying[1]),
			hash : this.web3Service.web3.toAscii(saying[1]),
			address : saying[2],
			blockCount : saying[0].toString(10)
		}; 
		return result;
  }

	//https://ethereum.stackexchange.com/questions/23058/web3-return-bytes32-string
	public async toldSometing(text : string, textHash : string | number){
		try {
			const contract = await this.IToldUYouSo.deployed();
			return contract.told(
				this.web3Service.web3.fromAscii(textHash), 
				this.web3Service.web3.fromAscii(text), 
				{from : this.account});
		} catch (error) {
			console.error(error);
		}
	}

	private watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
			this.account = accounts[0];
    });
  }
}