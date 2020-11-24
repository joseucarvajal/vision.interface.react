import React from "react";
import { IField } from "../../../../shared/contracts/types";
import NumericInput from 'react-numeric-input';

interface IFieldNumericgProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldNumeric: React.FC<IFieldNumericgProps> = ({ field, setFieldValue }) => {

  const { value } = field;
  const onChange = (e:any) => {
    setFieldValue(field, e === null ? '' : e.toString());
  }

  return (    
    <NumericInput className="form-control"
      value={value}
      onChange={onChange} 
      disabled={field.readOnly}
      title={field.tooltip}
      required={field.required}
      precision={field.decimalPlaces}
    />
  );
};

export default FieldNumeric;
