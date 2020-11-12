import React, { useState, useEffect } from "react";
import { IField } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import UseChangeFieldValue from "../../../../hooks/api/useChangeFieldValue";

interface IFieldStringProps {
  field: IField;
}

const FieldString: React.FC<IFieldStringProps> = ({ field }) => {
  const { value } = field;
  const queryCache = useQueryCache();

  const [fieldValue, setFieldValue] = useState(value); 

  useEffect(() => {
    setFieldValue(field.value);
  }, [field.value]);

  const onChange = (e:any) => {
    setFieldValue(e.target.value);
    UseChangeFieldValue(queryCache, field, e.target.value);
  }
  
  return (    
    <input type="text" className="form-control"
      value={fieldValue} 
      onChange={onChange} 
      size = {field.width}
      maxLength={field.maxLength} 
      disabled={field.readOnly}
      title={field.tooltip}              
    />
);
};

export default FieldString;
