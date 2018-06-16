import { Component, OnInit } from "@angular/core";
import { IToldUSoService } from "../itolduso.service";
import { Saying } from "../saying";

@Component({
  selector: 'told-something',
  templateUrl: './told-something.component.html',
  styleUrls: ['./told-something.component.css']
})
export class ToldSomethingComponent implements OnInit{
  
  sayingText :string;
  hashedText : string | number; 

  constructor(private iToldUSoService : IToldUSoService) { }

  async ngOnInit(){
    console.log("Initializing 'Told Something' component..."); 
  }

  getHash(term : string): void {
    this.sayingText = term;
    this.hashedText = this.hashFnv32a(term, true, undefined);
  }
  
  async iToldYou(): Promise<void> {
    console.log(`${this.sayingText} - ${this.hashedText}`);

    let result = await this.iToldUSoService.toldSometing(this.sayingText, this.hashedText);
    console.log(result);

    //TODO : fire event for sayings component to refresh
  }
 
  private hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;
  
    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
  }    
}