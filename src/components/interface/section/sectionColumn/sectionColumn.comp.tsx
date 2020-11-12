import React from "react";
import { IField, IStaticLookupHash } from "../../../../shared/contracts/types";
import Field from "../../field/field.comp";

interface ISectionColumnProps {
  fieldsColumn: IField[];
  columnClass: string;
  staticLookups: IStaticLookupHash;
}

const SectionColumn: React.FC<ISectionColumnProps> = ({ fieldsColumn, columnClass, staticLookups }) => {

  return (
    <div className={columnClass}>
      {fieldsColumn.map((field) => (
          <Field 
            key={field.id} 
            field={field}
            staticLookups={staticLookups}
          />
        ))
      }
    </div>
  );
};

export default SectionColumn;