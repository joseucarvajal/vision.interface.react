import React, { useEffect, useState } from "react";
import { IDictionary, IField } from "../../../../shared/contracts/types";
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../../../../api/data'
import useGetDynamicLookupData from '../../../../hooks/api/useGetDynamicLookupData';
import useGetDynamicLookupDataFilter from '../../../../hooks/interface/useGetDynamicLookupDataFilter'
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

  const [state, setstate] = useState('');

  const { error, isLoading, data } = useGetDynamicLookupData(
    field.lookupKey
  );


  const filterColors = (inputValue: string) => {

    return data?.filter( (x: any) =>
      x.value.toLowerCase().includes(inputValue.toLowerCase())
    ).map((d:any) => ({ label: d.value, value: d.key }));

    // return (data?.map((d:any) => ({ label: d.value, value: d.key }))) 

    // return data?.filter( (x: any) =>
    //   x.label.toLowerCase().includes(inputValue.toLowerCase())
    // );
    // return colourOptions.filter(i =>
    //   i.label.toLowerCase().includes(inputValue.toLowerCase())
    // );
  };
  const loadOptions = (inputValue: any, callback: any) => {
    // setTimeout(() => {
      callback(filterColors(inputValue));
    // }, 1000);
  };



  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    setstate(inputValue);
    return inputValue;
  };
  
  const formatOptionLabel = (option: { CscID:number, CscDesc:string }, context: { CscID:number, CscDesc:string }) => {
      return <div>{option.CscID}</div>;
  };

  // return (
  //   <div>
  //     <Select
  //       options={[
  //         {
  //           id: 1,
  //           CscID: "A",
  //           CscDesc: "ADesc"
  //         },
  //         {
  //           id: 2,
  //           CscID: "b",
  //           CscDesc: "ADesc"
  //         },
  //         {
  //           id: 3,
  //           CscID: "c",
  //           CscDesc: "ADesc"
  //         },
  //       ]}
  //       isMulti
  //       menuIsOpen={true}
  //       formatOptionLabel={(option, { context }) => {
  //         return context === 'menu' ? option.id : option.CscID;
  //       }}
  //     />
  //   </div>
  // );

  return (
    <Select
      isMulti
      cacheOptions
      // loadOptions={loadOptions}
      options={colourOptions}
      defaultOptions
      onInputChange={handleInputChange}
      formatOptionLabel={(option, { context }) => {
        return context === 'menu' ? `${option.value} ${option.label}` : option.value;
      }}
  />
  );

  // return (
  //     <AsyncSelect
  //       isMulti
  //       cacheOptions
  //       loadOptions={loadOptions}
  //       defaultOptions
  //       onInputChange={handleInputChange}
  //       getOptionLabel={option =>`${option.value} ${option.label}`}
  //       getOptionValue={option => `${option.value}`}
  //     />
  //   );
};

export default FieldDynamicLookup;
