import React from "react";
import { IDictionary, IField } from "../../../../shared/contracts/types";

interface IFieldStaticProps {
  field: IField;
  dictionaryLookup: IDictionary[];
  setFieldValue: (field: IField, value: string) => void;
}

const FieldStaticLookup: React.FC<IFieldStaticProps> = ({ field, dictionaryLookup, setFieldValue }) => {
  console.log('Field lookup static ' + field.name);

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
