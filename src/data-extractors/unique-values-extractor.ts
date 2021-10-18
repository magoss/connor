import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import map from "lodash/fp/map";
import filter from "lodash/fp/filter";
import head from "lodash/fp/head";

export const extractUnique = (propertyName: string, collection: any[]): any[] => {
  
  return flow(
    groupBy(propertyName),
    map((group: any[]) => head(group)[propertyName]),
    filter(Boolean),
  )(collection);
}
