import React from "react";
import { IField } from "../../../shared/contracts/types";
import FieldString from "./fieldString.comp"
import FieldBoolean from "./fieldBoolean.comp"

interface IFieldProps {
  field: IField;
}

const Field: React.FC<IFieldProps> = ({ field }) => {
  return (
    <>
      { field.type === "String" && ( <FieldString key={field.id} field={field} /> ) }
      { field.type === "Boolean"  && ( <FieldBoolean key={field.id} field={field} /> ) }      
    </>
  );
};

export default Field;