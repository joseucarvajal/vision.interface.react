import React from "react";
import { IField } from "../../../../shared/contracts/types";


interface IFieldBooleanProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldBoolean: React.FC<IFieldBooleanProps> = ({ field, setFieldValue }) => {
  const { value } = field;
  
  const onChange = (e:any) => {
    setFieldValue(field, e.target.checked.toString());
  }

  const isChecked = value === "true" ? true : false;

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
