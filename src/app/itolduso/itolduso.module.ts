import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilModule } from "../util/util.module";
import { ToldSomethingComponent } from "./told-something/told-something.component";

@NgModule({
    imports : [
        CommonModule, 
        UtilModule
    ],
    declarations :[ ToldSomethingComponent],
    exports : [ ToldSomethingComponent ]
})
export class IToldYouSoModule{
    
}