import React, { useState } from "react";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import NumericInput from 'react-numeric-input';
import Select from 'react-select'
import { queryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";


interface IFieldMoneygProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldMoney: React.FC<IFieldMoneygProps> = ({ field, setFieldValue }) => {

  const { value } = field;

  const [lookupCurrency, setLookupCurrency] = useState(field.showCurrency ? value.split('|')[1] : '');

  const onChange = (e:any) => {
    console.log('Cambio valor', e.toString(), lookupCurrency);

    if(!field.showCurrency){
      setFieldValue(field, e === null ? '' : e.toString());
    }
    else{
      setFieldValue(field, e === null ? `|${lookupCurrency}` : `${e.toString()}|${lookupCurrency}`);
    }
  }
  const onChangeCurrency = (e:any) => {
    setLookupCurrency(e.value);
    console.log('Cambio currency', value.split('|')[0], e.value);
    setFieldValue(field, `${value.split('|')[0]}|${e.value}`);
  }

  const  data = queryCache.getQueryData<IInterfaceForm>([ApiEndPoints.GetForm]);

  let currencyDefaultValue = {label: '', value: ''};

  if(field.showCurrency)
  {
    currencyDefaultValue = {label: value.split('|')[1], value: value.split('|')[1]};
  }

  return (    
    <>
      <NumericInput className="form-control"
        value={value.split('|')[0]}
        onChange={onChange} 
        disabled={field.readOnly}
        title={field.tooltip}
        required={field.required}
        precision={field.decimalPlaces}
        format={num => (num + '$')}
      />
      {field.showCurrency && 
        <Select
          options={ data?.staticLookups['LOOKUP_CURRENCIES'] } 
          defaultValue={ currencyDefaultValue }
          disabled={field.readOnly}
          onChange={onChangeCurrency} 
          />
      }
    </>
  );
};

export default FieldMoney;
