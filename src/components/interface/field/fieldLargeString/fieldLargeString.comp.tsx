import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";

interface IFieldLargeStringProps {
  field: IField;
}

const FieldLargeString: React.FC<IFieldLargeStringProps> = ({ field }) => {
  const { value } = field;
  const queryCache = useQueryCache();

  const [fieldValue, setFieldValue] = useState(value); 

  useEffect(() => {
    setFieldValue(field.value);
  }, [field.value]);

  const onChange = (e:any) => {
    setFieldValue(e.target.value);
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
              value: e.target.value
            }
          }
        };
      }
    );
  }
  
  return (
    <textarea className="form-control"
      value={fieldValue} 
      onChange={onChange}               
      cols = {field.width}
      maxLength={field.maxLength} 
      disabled={field.readOnly}
      title={field.tooltip}
      rows={field.height}              
    />
  );
};

export default FieldLargeString;
