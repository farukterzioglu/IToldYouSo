import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilModule } from "../util/util.module";
import { ToldSomethingComponent } from "./told-something/told-something.component";
import { SayingsComponent } from './sayings/sayings.component';

@NgModule({
    imports : [
        CommonModule, 
        UtilModule
    ],
    declarations :[ ToldSomethingComponent, SayingsComponent],
    exports : [ ToldSomethingComponent, SayingsComponent ]
})
export class IToldYouSoModule{
    
}