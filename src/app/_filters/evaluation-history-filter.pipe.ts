import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dataFilter"
})

export class EvaluationHistoryFilterPipe implements PipeTransform {
  transform(value: any[], filter: string): any[] {

    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter && value ?
      value.filter(candidate =>
        ((candidate.updated_at != null) && (candidate.updated_at.toLocaleLowerCase().indexOf(filter) !== -1)) ||
        ((candidate.evaluatorName != null) && (candidate.evaluatorName.toLocaleLowerCase().indexOf(filter) !== -1))
      ) :
      value;
  }


}