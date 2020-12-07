import React from "react";
import { IField } from "../../../../shared/contracts/types";

interface IFieldStringProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldString: React.FC<IFieldStringProps> = ({ field, setFieldValue }) => {

  const { value } = field;
  const onChange = (e:any) => {
    setFieldValue(field, e.target.value);
  }

  return (    
    <input type="text" className="form-control"
      value={value} 
      onChange={onChange} 
      size = {field.width}
      maxLength={field.maxLength} 
      disabled={field.readOnly || (field.value !== '' && field.enterOnce)}
      title={field.tooltip}      
      required={field.required}
    />
  );
};

export default FieldString;
