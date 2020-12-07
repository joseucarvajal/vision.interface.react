import React from "react";
import { IField } from "../../../../shared/contracts/types";

interface IFieldLargeStringProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldLargeString: React.FC<IFieldLargeStringProps> = ({ field, setFieldValue }) => {
  
  const { value } = field;
  const onChange = (e:any) => {
    setFieldValue(field, e.target.value);
  }
  
  return (
    <textarea className="form-control"
      value={value} 
      onChange={onChange}               
      cols = {field.width}
      maxLength={field.maxLength} 
      disabled={field.readOnly || (field.value !== '' && field.enterOnce)}
      title={field.tooltip}
      rows={field.height}              
    />
  );
};

export default FieldLargeString;
