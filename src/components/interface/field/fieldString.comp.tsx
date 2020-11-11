import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";

interface IFieldStringProps {
  field: IField;
}

const FieldString: React.FC<IFieldStringProps> = ({ field }) => {
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
    <div className="row">
          <div className="col-6">
            <span className="itroi-message">{field.name}</span>
          </div>
          <div className="col-6">
            <input name={field.id} type="text" className="itroi-input" value={fieldValue} onChange={onChange}/>
          </div>
    </div>
  );
};

export default FieldString;
