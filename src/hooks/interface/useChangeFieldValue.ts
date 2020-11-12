import { QueryCache } from "react-query";
import {ApiEndPoints} from "../../api";
import { IField, IInterfaceForm } from "../../shared/contracts/types";

export default function useChangeFieldValue(queryCache: QueryCache, field: IField, value: string) {

  queryCache.setQueryData<IInterfaceForm>(
      [ApiEndPoints.GetForm],
      (previous: any) => {
        console.log({previous});
        return {
          ...previous,
          fields:{
            ...previous.fields,
            [field.id]:{
              ...field,
              value: value
            }
          }
        };
      }
    );
}