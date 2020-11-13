import React from "react";
import { IField } from "../../../../shared/contracts/types";
import Field from "../../field/field.comp";

interface ISectionColumnProps {
  fieldsColumn: IField[];
  columnClass: string;
  setFieldValue: (field:IField, value:string) => void;
}

const SectionColumn: React.FC<ISectionColumnProps> = ({ fieldsColumn, columnClass, setFieldValue }) => {

  return (
    <div className={columnClass}>
      {fieldsColumn.map((field) => (
          <Field 
            key={field.id} 
            field={field}
            setFieldValue={setFieldValue}
          />
        ))
      }
    </div>
  );
};

export default SectionColumn;