import React from "react";
import { IField } from "../../../shared/contracts/types";
import Field from "../field/field.comp";

interface ISectionColumnProps {
  fieldsColumn: IField[];
  columnClass: string;
}

const SectionColumn: React.FC<ISectionColumnProps> = ({ fieldsColumn, columnClass }) => {

  return (
    <div className={columnClass}>
      {fieldsColumn.map((field) => (
          <Field 
            key={field.id} 
            field={field}
          />
        ))
      }
    </div>
  );
};

export default SectionColumn;