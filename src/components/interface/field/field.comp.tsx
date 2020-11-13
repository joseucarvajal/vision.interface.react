import React from "react";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";
import FieldString from "./fieldString/fieldString.comp"
import FieldLargeString from "./fieldLargeString/fieldLargeString.comp"
import FieldBoolean from "./fieldBoolean/fieldBoolean.comp"
import FieldDate from "./fieldDate/fieldDate.comp"
import FieldStaticLookup from "./fieldStaticLookup/fieldStaticLookup.comp"
import { queryCache } from "react-query";
import { ApiEndPoints } from "../../../api";

interface IFieldProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const Field: React.FC<IFieldProps> = ({ field, setFieldValue }) => {

  const  data = queryCache.getQueryData<IInterfaceForm>(ApiEndPoints.GetForm);

  return (
    <div className="row mt-1">
          <div className="col-4 vision-right">
            {field.required && <label className="vision-required">*&nbsp;</label>}            
            {field.isUnique && <label className="vision-unique">*&nbsp;</label>}            
            <label>{field.name}</label>
          </div>
          <div className="col-8">
            { field.type === "String" && !field.height && ( <FieldString key={field.id} field={field} setFieldValue={setFieldValue}/> ) }
            { field.type === "String" && field.height && ( <FieldLargeString key={field.id} field={field} setFieldValue={setFieldValue}/> ) }
            { field.type === "Boolean"  && ( <FieldBoolean key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { field.type === "Date"  && ( <FieldDate key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { field.type === "StaticLookup" 
              && data 
              && ( <FieldStaticLookup key={field.id} field={field} dictionaryLookup={data.staticLookups[field.lookupKey]} setFieldValue={setFieldValue}/> ) 
            }      
            {field.hint && <label>({field.hint})</label>}
          </div>
    </div>

  );
};

export default Field;