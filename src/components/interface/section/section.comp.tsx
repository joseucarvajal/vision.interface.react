import React from "react";

import useGetFormDefinition from "../../../hooks/api/useGetFormDefinition";
import { ISection, IFieldHash } from "../../../shared/contracts/types";
import Field from "../field/field.comp";

interface ISectionProps {
  section: ISection;
  fields: IFieldHash;
}

const Section: React.FC<ISectionProps> = ({ section, fields }) => {
  const { title, fieldsIds } = section;

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {fieldsIds.map((idField) => (
          <Field 
            key={idField} 
            field={fields[idField]}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
