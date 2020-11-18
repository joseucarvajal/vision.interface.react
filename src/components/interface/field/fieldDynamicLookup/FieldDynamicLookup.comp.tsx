import React, { useEffect, useState } from "react";
import { IDictionary, IField } from "../../../../shared/contracts/types";
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../../../../api/data'
import useGetDynamicLookupData from '../../../../hooks/api/useGetDynamicLookupData';
import Select from "react-select";

interface IFieldDynamicLookupProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldDynamicLookup: React.FC<IFieldDynamicLookupProps> = ({ field, setFieldValue }) => {

  const { value } = field;

  const onChange = (e:any) => {
    setFieldValue(field, e.target.value);
  }

  const { setLookupFilter, error, isLoading, data } = useGetDynamicLookupData(
    field.lookupKey
  );

  const filterValues = (data2: any) => {

    // return data?.filter( (x: any) =>
    //   x.label.toLowerCase().includes(inputValue.toLowerCase())
    // ).map((d:any) => ({ label: d.label, value: d.key, fullLabel: d.fullLabel }));

    console.log("Field dynamic lookup data", data2);

    // return (colourOptions.map((d:any) => ({ label: d.label, value: d.value, fullLabel: `${d.value}|${d.label}` }))) ;

    return (data2?.map((d:any) => ({ label: d.label, value: d.key, fullLabel: d.fullLabel }))) ;
  };

  const loadOptions = (inputValue: any, callback: any) => {
    //  setTimeout(() => {
  //    callback(filterValues(inputValue));
        callback(data?.map((d:any) => ({ label: d.label, value: d.key, fullLabel: d.fullLabel })));
    //  }, 1000);
  };



  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');

    console.log("handleInputChange", inputValue);

    setLookupFilter(inputValue);
    return inputValue;
  };
  
  const promiseOptions = (inputValue: string) =>
    new Promise(resolve => {
        console.log("promiseOptions", inputValue);
        setLookupFilter(inputValue);
        resolve(filterValues(data));
    }
  );

  return (
    <>
    <div>{JSON.stringify(data)}</div>
      
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        // loadOptions={loadOptions}
        //onInputChange={handleInputChange}
        formatOptionLabel={(option, { context }) => {
          return context === 'menu' ? option.fullLabel : option.label;
        }}
        />
      </>
    );
};

export default FieldDynamicLookup;
