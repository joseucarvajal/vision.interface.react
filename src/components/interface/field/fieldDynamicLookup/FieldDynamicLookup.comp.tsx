import React, { useEffect, useState } from "react";
import { IDictionary, IField } from "../../../../shared/contracts/types";
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../../../../api/data'
import useGetDynamicLookupData from '../../../../hooks/api/useGetDynamicLookupData';
import Select from "react-select";

interface IFieldDynamicLookupProps {
  field: IField;
  dictionaryLookup: IDictionary[];
  setFieldValue: (field: IField, value: string) => void;
}

const FieldDynamicLookup: React.FC<IFieldDynamicLookupProps> = ({ field, dictionaryLookup, setFieldValue }) => {

  const { value } = field;

  const onChange = (e:any) => {
    setFieldValue(field, e.target.value);
  }

  const { setLookupFilter, error, isLoading, data } = useGetDynamicLookupData(
    field.lookupKey
  );

  const filterColors = (inputValue: string) => {

    // return data?.filter( (x: any) =>
    //   x.label.toLowerCase().includes(inputValue.toLowerCase())
    // ).map((d:any) => ({ label: d.label, value: d.key, fullLabel: d.fullLabel }));

    console.log("Field dynamic lookup data", data);

    return (data?.map((d:any) => ({ label: d.value, value: d.key, fullLabel: d.fullLabel }))) ;
  };
  const loadOptions = (inputValue: any, callback: any) => {
    // setTimeout(() => {
      callback(filterColors(inputValue));
    // }, 1000);
  };



  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    setLookupFilter(inputValue);
    return inputValue;
  };
  

  return (
    <>
    <div>{JSON.stringify(data)}</div>
      
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={handleInputChange}
        formatOptionLabel={(option, { context }) => {
          return context === 'menu' ? `${option.fullLabel}` : option.label;
        }}
        />
      </>
    );
};

export default FieldDynamicLookup;
