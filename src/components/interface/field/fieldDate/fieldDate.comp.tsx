import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";

interface IFieldDateProps {
  field: IField;
}

const FieldDate: React.FC<IFieldDateProps> = ({ field }) => {
  const { value } = field;
  const queryCache = useQueryCache();

  const [fieldValue, setFieldValue] = useState(value); 

  const getDateValue = () => {
    let newValue = fieldValue;
    if (fieldValue.indexOf('T') != -1) {
      newValue = fieldValue.split('T')[0] + 'T00:00:00Z';
    }
    else {
      newValue += 'T00:00:00Z';
    }

    let newDate = new Date(newValue);

    //To support mutiple timezones
    newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000);

    return newDate;
  };

  const dateValue = getDateValue();

  useEffect(() => {
    setFieldValue(field.value);
  }, [field.value]);

  const onChange = (e:any) => {
    setFieldValue(e.target.value);
    queryCache.setQueryData<IInterfaceForm>(
      [ApiEndPoints.GetForm],
      (previous: any) => {
        console.log({previous});
        return {
          ...previous,
          fields:{
            ...previous.fields,
            [field.id]:{
              ...field,
              value: e.target.value
            }
          }
        };
      }
    );
  }

  return (
    <input type="text" className="form-control"
      value={fieldValue} 
      onChange={onChange} 
      size = {field.width}
      maxLength={field.maxLength} 
      disabled={field.readOnly}
      title={field.tooltip}              
    />
  );
};

export default FieldDate;
