import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";
import "./fieldString.css";
import { ITextFieldStyles, Label, TextField } from "@fluentui/react";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

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

  const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
  
  return (
    <div className="row mt-1">
          <div className="col-6 vision-right">
            {/* <span>{field.name}</span> */}
            <Label>{field.name}</Label>
          </div>
          <div className="col-6">
            <TextField value={fieldValue} onChange={onChange} styles={narrowTextFieldStyles}/>
            {/* <input name={field.id} type="text" className="vision-input" value={fieldValue} onChange={onChange}/> */}
          </div>
    </div>
  );
};

export default FieldString;
