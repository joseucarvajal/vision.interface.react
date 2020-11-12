import React, { useState, useEffect } from "react";
import { IField } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import UseChangeFieldValue from "../../../../hooks/api/useChangeFieldValue";

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
    UseChangeFieldValue(queryCache, field, e.target.checked.toString());
  }

  const isChecked = fieldValue === "true" ? true : false;

  return (
    <input type="checkbox" className="form-check-input"
      checked={isChecked} 
      onChange={onChange} 
      title={field.tooltip}
      disabled={field.readOnly}
    />
  );
};

export default FieldBoolean;
