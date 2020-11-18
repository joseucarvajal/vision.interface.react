import React from "react";
import { queryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import FieldStaticLookup from "../fieldStaticLookup/fieldStaticLookup.comp";
import FieldDynamicLookup from "../fieldDynamicLookup/FieldDynamicLookup.comp";
import FieldDynamicLookupTest from "../fieldDynamicLookup/FieldDynamicLookupTest.comp";

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
      { (field.lookupType === "LOOKUP_SOURCE_DYNAMIC" && data) 
          && <FieldDynamicLookupTest key={field.id} field={field} setFieldValue={setFieldValue}/>}
    </>
  );
};

export default FieldLookup;
