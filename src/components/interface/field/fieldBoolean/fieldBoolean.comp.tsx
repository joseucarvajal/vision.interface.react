import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";

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

  const isChecked = fieldValue === "true" ? true : false;

  return (
    <input type="checkbox" 
      checked={isChecked} 
      onChange={onChange} 
      title={field.tooltip}
      disabled={field.readOnly}
    />
  );
};

export default FieldBoolean;
