import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../../util/web3.service";

@Component({
  selector: 'told-something',
  templateUrl: './told-something.component.html',
  styleUrls: ['./told-something.component.css']
})
export class ToldSomethingComponent implements OnInit{
    ngOnInit(): void {
      console.log("Init : ToldSomethingComponent");
      }

    // constructor
}