import React, { useState, useEffect } from "react";
import useGetFormDefinition from "../../../hooks/api/useGetFormDefinition";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";

interface IFieldProps {
  field: IField;
}

const Field: React.FC<IFieldProps> = ({ field }) => {
  const { value } = field;
  const queryCache = useQueryCache();

  const [fieldValue, setFieldValue] = useState(value); 

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
    <input
      type="text"
      value={fieldValue}
      onChange={onChange}
    />
  );
};

export default Field;
