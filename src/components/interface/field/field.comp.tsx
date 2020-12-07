import React from "react";
import { IField } from "../../../shared/contracts/types";
import FieldString from "./fieldString/fieldString.comp"
import FieldLargeString from "./fieldLargeString/fieldLargeString.comp"
import FieldBoolean from "./fieldBoolean/fieldBoolean.comp"
import FieldDate from "./fieldDate/fieldDate.comp"
import FieldLookup from "./fieldLookup/fieldLookup.comp"
import FieldNumeric from "./fieldNumeric/fieldNumeric.comp"
import FieldMoney from "./fieldMoney/fieldMoney.comp"
import enterOnce from "../../../images/ICONGO.gif"


interface IFieldProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const Field: React.FC<IFieldProps> = ({ field, setFieldValue }) => {

  return (
    <div className="row mt-1">
          <div className="col-4 vision-right">
            {field.required && <label className="vision-required">*&nbsp;</label>}            
            {field.isUnique && <label className="vision-unique">*&nbsp;</label>}            
            {field.enterOnce && <img src={enterOnce} className="vision-enterOnce" alt="Enter Once" />} 
            <label>{field.name}</label>
          </div>
          <div className="col-8">
            { field.type === "String" && !field.height && ( <FieldString key={field.id} field={field} setFieldValue={setFieldValue}/> ) }
            { field.type === "String" && field.height && ( <FieldLargeString key={field.id} field={field} setFieldValue={setFieldValue}/> ) }
            { field.type === "Boolean"  && ( <FieldBoolean key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { field.type === "Date"  && ( <FieldDate key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { field.type === "Numeric"  && ( <FieldNumeric key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { field.type === "Money"  && ( <FieldMoney key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { (field.type === "Lookup" || field.type === "MLookup") && ( <FieldLookup key={field.id} field={field} setFieldValue={setFieldValue}/> ) }      
            { field.hint && <label>({field.hint})</label> }
            { field.required && field.value === '' && <label className="text-danger">Required value</label> }
          </div>
    </div>

  );
};

export default Field;