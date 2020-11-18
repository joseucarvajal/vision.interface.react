import React, { useEffect, useState } from "react";
import { IDictionary, IField } from "../../../../shared/contracts/types";
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../../../../api/data'
import useGetDynamicLookupData from '../../../../hooks/api/useGetDynamicLookupData';
import Select from "react-select";

interface IFieldDynamicLookupTestProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

// const filterColors = (inputValue: string) => {
//   return colourOptions.filter(i =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );
// };

// const promiseOptions = (inputValue: string) =>
//   new Promise(resolve => {
//     // setTimeout(() => {
//       resolve(filterColors(inputValue));
//     // }, 1000);
// });

const FieldDynamicLookupTest: React.FC<IFieldDynamicLookupTestProps> = ({ field, setFieldValue }) => {

  const { setLookupFilter, error, isLoading, data } = useGetDynamicLookupData(
    field.lookupKey
  );
  
  const filterColors = (inputValue: string) => {
    // return data?.filter((i: any) =>
    //   i.fullLabel.toLowerCase().includes(inputValue.toLowerCase())
    // );
    console.log('Resolve', data);
    return data?.map((d:any) => ({ label: d.label, value: d.key, fullLabel: d.fullLabel }));
  };
  
  // const promiseOptions = (inputValue: string) =>{
  //   setLookupFilter(inputValue);
  //   return new Promise(resolve => {
  //         resolve(filterColors(inputValue));
  //   });
  // };

  const promiseOptions = (inputValue: string) => {
    const url = `http://localhost:60517/api/Interface/GetDynamicLookupValues?env=dev&lookupCode=PPMI_BROWSE_USER&filter=${inputValue}`;
    return fetch(url)
            .then(response => response.json()) // my option list array?
            .then(data => data?.map((d:any) => ({ label: d.label, value: d.key, fullLabel: d.fullLabel })))
            .catch(err => {
              console.log('some error', err);
            });
  };

  return (
    <>
      <AsyncSelect 
        isMulti
        cacheOptions 
        defaultOptions 
        loadOptions={promiseOptions} 
        formatOptionLabel={(option, { context }) => {
          return context === 'menu' ? option.fullLabel : option.label;
        }}
      />
    </>
  );
};

export default FieldDynamicLookupTest;
