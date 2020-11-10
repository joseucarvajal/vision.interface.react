import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import { Checkbox } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(undefined, { disableWarnings: true });

interface IFieldBooleanProps {
  field: IField;
}

const FieldBoolean: React.FC<IFieldBooleanProps> = ({ field }) => {
  const { value } = field;
  const queryCache = useQueryCache();

  const [fieldValue, setFieldValue] = useState(value); 

  useEffect(() => {
    setFieldValue(field.value);
  }, [field.value]);

  const onChange = (e:any) => {
    setFieldValue(e.target.checked.toString());
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
              value: e.target.checked.toString()
            }
          }
        };
      }
    );
  }

  if(fieldValue === "true")
  {
  }

  return (
    <>
      {fieldValue === "true" 
        ? <Checkbox label={field.name} defaultChecked onChange={onChange}/>
        : <Checkbox label={field.name} onChange={onChange}/>
      }
    </>
  );
};

export default FieldBoolean;
