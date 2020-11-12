import React, { useState, useEffect } from "react";
import { IField, IStaticLookupHash } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import UseChangeFieldValue from "../../../../hooks/interface/useChangeFieldValue";

interface IFieldStaticProps {
  field: IField;
  staticLookups: IStaticLookupHash;
}

const FieldStaticLookup: React.FC<IFieldStaticProps> = ({ field, staticLookups }) => {
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

  const lookupValues = staticLookups[field.lookupKey];

  return (    
    <select className="form-control"
      value={fieldValue} 
      onChange={onChange}
      disabled={field.readOnly}
      title={field.tooltip} 
    >
      {lookupValues.map(({key, value}) => (
            <option key={key} value={key}>{value}</option>
      ))}
    </select>
);
};

export default FieldStaticLookup;
