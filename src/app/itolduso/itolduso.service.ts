import { Web3Service } from "../util/web3.service";
import { Injectable } from "@angular/core";
import { Saying } from "./saying";
import { Observable } from "rxjs";
import { resolve } from "dns";

declare let require: any;
const contractArtifacts = require("../../../build/contracts/IToldUSo.json");

@Injectable({providedIn: 'root'})
export class IToldUSoContractService{
	IToldUYouSo: any;
  sayings : Saying[];
	initializing : boolean;

	constructor(private web3Service : Web3Service){}
	
	public async initializeContract() : Promise<void>{
		console.log("initializeContract");

		if(this.IToldUYouSo) {
			console.log("Contract already created.");
			return;
		}

		if(this.initializing) {
			console.log("Contract is being initialized...");

			const delay = new Promise(resolve => setTimeout(resolve, 300));
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
    try {
      const deployedContrat = await this.IToldUYouSo.deployed();
      return deployedContrat.getSayingCount.call();
    } catch (e) {
      console.error(e);
    }
  }
}