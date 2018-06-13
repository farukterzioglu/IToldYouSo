import { Web3Service } from "../util/web3.service";
import { Injectable } from "@angular/core";
import { Saying } from "./saying";
import { Observable } from "rxjs";

declare let require: any;
const contractArtifacts = require("../../../build/contracts/IToldUSo.json");

@Injectable({providedIn: 'root'})
export class IToldUSoContractService{
	IToldUYouSo: any;
  sayings : Saying[];

	constructor(private web3Service : Web3Service){}
	
	public initializeContract(){
		return this.web3Service.artifactsToContract(contractArtifacts)
		.then((abstraction) => {
			this.IToldUYouSo = abstraction;
			console.log("Contract created.");
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