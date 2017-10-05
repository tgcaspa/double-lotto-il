import { NgModule, Pipe, PipeTransform } from '@angular/core';

declare let _ :any;
@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

    transform (input: any[], character: string = ''): any {
        if (!_.isArray(input)) return input;
        return input.join(character);
    }

}

@NgModule({
    declarations: [
        JoinPipe
    ],
    exports: [JoinPipe]
})
export class JoinPipeModule {}
