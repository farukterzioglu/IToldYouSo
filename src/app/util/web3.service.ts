import {Injectable} from '@angular/core';
import * as contract from 'truffle-contract';
import { Observable, Subject } from 'rxjs';

declare let require: any;
const Web3 = require('web3');

declare let window: any;

@Injectable()
export class Web3Service{
    private web3 : any;
    private accounts: string[];
    public ready = false;
    public accountsObservable = new Subject<string[]>();

    private web3Provider: null;
    private contracts: {};

    constructor() {
        window.addEventListener('load', (event) => {
        this.bootstrapWeb3();
        });
    }
  
    public bootstrapWeb3() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            this.web3Provider = window.web3.currentProvider;
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        
        this.web3 = new Web3(this.web3Provider);
        console.log("Web3 initialized.");

        setInterval(() => this.initContract(), 100);
    }

    initContract(){
        
    }
}