import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from "@angular/common";

declare let _ :any;
@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

    transform (input: any[], character: string = ''): any {
        if (!_.isArray(input)) return input;
        return _
            .map(input, (i) => new DecimalPipe('en').transform(i, '2.0'))
            .join(character);
    }

}

@NgModule({
    declarations: [
        JoinPipe
    ],
    exports: [JoinPipe]
})
export class JoinPipeModule {}
