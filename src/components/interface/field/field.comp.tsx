import React from "react";
import { IField, IStaticLookupHash } from "../../../shared/contracts/types";
import FieldString from "./fieldString/fieldString.comp"
import FieldLargeString from "./fieldLargeString/fieldLargeString.comp"
import FieldBoolean from "./fieldBoolean/fieldBoolean.comp"
import FieldDate from "./fieldDate/fieldDate.comp"
import FieldStaticLookup from "./fieldStaticLookup/fieldStaticLookup.comp"

interface IFieldProps {
  field: IField;
  staticLookups: IStaticLookupHash;
}

const Field: React.FC<IFieldProps> = ({ field, staticLookups }) => {
  return (
    <div className="row mt-1">
          <div className="col-4 vision-right">
            {field.required && <label className="vision-required">*&nbsp;</label>}            
            {field.isUnique && <label className="vision-unique">*&nbsp;</label>}            
            <label>{field.name}</label>
          </div>
          <div className="col-8">
            { field.type === "String" && !field.height && ( <FieldString key={field.id} field={field} /> ) }
            { field.type === "String" && field.height && ( <FieldLargeString key={field.id} field={field} /> ) }
            { field.type === "Boolean"  && ( <FieldBoolean key={field.id} field={field} /> ) }      
            { field.type === "Date"  && ( <FieldDate key={field.id} field={field} /> ) }      
            { field.type === "StaticLookup"  && ( <FieldStaticLookup key={field.id} field={field} staticLookups={staticLookups} /> ) }      
            {field.hint && <label>({field.hint})</label>}
          </div>
    </div>

  );
};

export default Field;