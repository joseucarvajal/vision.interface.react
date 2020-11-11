import React from "react";
import { IField } from "../../../shared/contracts/types";
import FieldString from "./fieldString/fieldString.comp"
import FieldLargeString from "./fieldLargeString/fieldLargeString.comp"
import FieldBoolean from "./fieldBoolean/fieldBoolean.comp"
import FieldDate from "./fieldDate/fieldDate.comp"

interface IFieldProps {
  field: IField;
}

const Field: React.FC<IFieldProps> = ({ field }) => {
  return (
    <div className="row mt-1">
          <div className="col-6 vision-right">
            {field.required && <span className="vision-required">*&nbsp;</span>}            
            {field.isUnique && <span className="vision-unique">*&nbsp;</span>}            
            <span className="vision-float-left">{field.name}</span>
          </div>
          <div className="col-6">
            { field.type === "String" && !field.height && ( <FieldString key={field.id} field={field} /> ) }
            { field.type === "String" && field.height && ( <FieldLargeString key={field.id} field={field} /> ) }
            { field.type === "Boolean"  && ( <FieldBoolean key={field.id} field={field} /> ) }      
            { field.type === "Date"  && ( <FieldDate key={field.id} field={field} /> ) }      
            {field.hint && <span>({field.hint})</span>}
          </div>
    </div>

  );
};

export default Field;