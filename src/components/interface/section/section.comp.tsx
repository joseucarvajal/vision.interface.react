import React from "react";
import { ISection, IFieldHash } from "../../../shared/contracts/types";
import Field from "../field/field.comp";

interface ISectionProps {
  section: ISection;
  fields: IFieldHash;
}

const Section: React.FC<ISectionProps> = ({ section, fields }) => {
  const { title, fieldsIds } = section;

  return (
    <>
      <div className="col-12">
        <div className="row intesectiontitle ">
            {title}
        </div>
        <div className="row">
            <div className="col-6">
              {fieldsIds.map((idField) => (
                <Field 
                  key={idField} 
                  field={fields[idField]}
                />
              ))}
            </div>
            <div className="col-6">
                col2
            </div>
        </div>
      </div>
    </>
  );
};

export default Section;
