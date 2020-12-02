import React from "react";
import { IField } from "../../../../shared/contracts/types";
import AsyncSelect from 'react-select/async';
import { ApiEndPoints, CLARITY_ENDPOINT } from "../../../../api";

interface IFieldDynamicLookupProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}


const search = window.location.search;
const params = new URLSearchParams(search);
const env = params.get('env');
const parentCode = params.get('parentCode');

const FieldDynamicLookup: React.FC<IFieldDynamicLookupProps> = ({ field, setFieldValue }) => {

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

  const promiseOptions = (inputValue: string) => {

    const url = `${CLARITY_ENDPOINT}${ApiEndPoints.GetDynamicLookupValues}?env=${env}&lookupCode=${field.lookupKey}&filter=${inputValue}&parentCode=${parentCode}`;
    return fetch(url)
            .then(response => response.json())
            .then(data => data.map((d:any) => ({ label: d.label, value: d.value, fullLabel: d.fullLabel })))
            .catch(err => {
              console.error('Get dynamic lookup data', err);
            });
  };

  return (
    <AsyncSelect
      isMulti={field.type === "MLookup"}
      cacheOptions 
      // defaultOptions
      onChange={onChange} 
      loadOptions={promiseOptions} 
      isDisabled={field.readOnly}      
      title={field.tooltip}
      formatOptionLabel={(option, { context }) => {
        return context === 'menu' ? option.fullLabel : option.label;
      }}
      defaultValue={ field.lookupValues }
    />
  );
};

export default FieldDynamicLookup;
