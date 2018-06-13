import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../../util/web3.service";
import { Saying } from "./saying";

@Component({
  selector: 'app-sayings',
  templateUrl: './sayings.component.html',
  styleUrls: ['./sayings.component.css']
})
export class SayingsComponent implements OnInit {
  sayings : Saying[];

  constructor() { }

  ngOnInit() {
    console.log("Init : SayingsComponent");

    this.sayings = [
      { address : "123", text : "asd", hash : "xxx", timestamp : "1"},
      { address : "456", text : "qwe", hash : "yyy", timestamp : "2"}
    ];
  }
}
