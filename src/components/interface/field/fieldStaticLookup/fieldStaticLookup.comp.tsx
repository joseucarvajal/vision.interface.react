import React from "react";
import Select from 'react-select'
import { IDictionary, ILookupValue, IField } from "../../../../shared/contracts/types";

interface IFieldStaticLookupProps {
  field: IField;
  dictionaryLookup: ILookupValue[];
  setFieldValue: (field: IField, value: string) => void;
}

const FieldStaticLookup: React.FC<IFieldStaticLookupProps> = ({ field, dictionaryLookup, setFieldValue }) => {

  const onChange = (e:any) => {
    console.log('e', e);
    if(e == null){
      console.log('new value', '');
      setFieldValue(field, '');
    }
    else{
      if(field.type === "MLookup"){
        console.log('new value', e.map(function(k:any){return k.value}).join("|"));
        setFieldValue(field, e.map(function(k:any){return k.value}).join("|"));
      }
      else{
        console.log('new value', e.value);
        setFieldValue(field, e.value);
      }
    }
  }

  return (    
    <Select
      options={ dictionaryLookup } 
      isMulti={field.type === "MLookup"}
      defaultValue={ field.lookupValues }
      onChange={onChange} 
      isDisabled={field.readOnly}      
      title={field.tooltip}      
      isClearable
    />
  );
};

export default FieldStaticLookup;
