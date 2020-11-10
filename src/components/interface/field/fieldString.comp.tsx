import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';


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

  const stackTokens = { childrenGap: 5 };

  return (
    <Stack horizontal tokens={stackTokens}>
        <Label>{field.name}</Label>
        <TextField  value={fieldValue} onChange={onChange} />
    </Stack>
  );
};

export default FieldString;
