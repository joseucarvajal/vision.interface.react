import React from "react";
import { queryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import FieldStaticLookup from "../fieldStaticLookup/fieldStaticLookup.comp";

interface IFieldLookupProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldLookup: React.FC<IFieldLookupProps> = ({ field, setFieldValue }) => {

  const  data = queryCache.getQueryData<IInterfaceForm>(ApiEndPoints.GetForm);

  return (    
    <>
      { (field.lookupType === "LOOKUP_SOURCE_STATIC" && data) 
          && <FieldStaticLookup key={field.id} field={field} dictionaryLookup={data.staticLookups[field.lookupKey]} setFieldValue={setFieldValue}/>}
    </>
  );
};

export default FieldLookup;
