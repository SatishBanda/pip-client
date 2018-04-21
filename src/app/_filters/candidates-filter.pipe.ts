import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";
import { CandidateUser } from "../models/candidate-user";

@Pipe({
  name: "candidateDataFilter"
})

export class CandidatesFilterPipe implements PipeTransform {
  transform(value: CandidateUser[], filter: string): CandidateUser[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter && value ?
      value.filter(candidate =>
        ((candidate.first_name != null) && (candidate.first_name.toLocaleLowerCase().indexOf(filter) !== -1)) ||
        ((candidate.last_name != null) && (candidate.last_name.toLocaleLowerCase().indexOf(filter) !== -1)) ||
        ((candidate.mobile != null) && (candidate.mobile.toLocaleLowerCase().indexOf(filter) !== -1)) ||
        ((candidate.username != null) && (candidate.username.toLocaleLowerCase().indexOf(filter) !== -1)) 
        // (brand.brand_status.indexOf(filter) !== -1)
      ) :
      value;
  }

}