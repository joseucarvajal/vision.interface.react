import React from "react";
import { IDictionary, IField } from "../../../../shared/contracts/types";

interface IFieldStaticLookupProps {
  field: IField;
  dictionaryLookup: IDictionary[];
  setFieldValue: (field: IField, value: string) => void;
}

const FieldStaticLookup: React.FC<IFieldStaticLookupProps> = ({ field, dictionaryLookup, setFieldValue }) => {

  const { value } = field;
  const onChange = (e:any) => {
    setFieldValue(field, e.target.value);
  }

  return (    
    <select className="form-control"
      value={value} 
      onChange={onChange}
      disabled={field.readOnly}
      title={field.tooltip} 
    >
      {dictionaryLookup.map(({key, value}) => (
            <option key={key} value={key}>{value}</option>
      ))}
    </select>
);
};

export default FieldStaticLookup;
