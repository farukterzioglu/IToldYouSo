import { Web3Service } from "../util/web3.service";
import { Injectable } from "@angular/core";
import { Saying } from "./saying";
import { Observable, Subject } from "rxjs";
import { tryParse } from "selenium-webdriver/http";

declare let require: any;
const contractArtifacts = require("../../../build/contracts/IToldUSo.json");

@Injectable({providedIn: 'root'})
export class IToldUSoContractService{
	IToldUYouSo: any;
  sayings : Saying[];
	initializing : boolean;
	
  public accountsObservable = new Subject<string[]>();

	constructor(private web3Service : Web3Service){}
	
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

	public async toldSometing(text : string, textHash : string, account : string){
		try {
			const contract = await this.IToldUYouSo.deployed();
			return contract.told(textHash, text, {from : account});
		} catch (error) {
			console.error(error);
		}
	}
}