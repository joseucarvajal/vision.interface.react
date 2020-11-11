import React from "react";
import { ISection, IFieldHash } from "../../../shared/contracts/types";
import Field from "../field/field.comp";
import SectionColumn from "./sectionColumn.comp";

interface ISectionProps {
  section: ISection;
  fields: IFieldHash;
}

const Section: React.FC<ISectionProps> = ({ section, fields }) => {
  const { title, fieldsIds } = section;

  // className, index is num columns
  const columnClassName = ["col-12", "col-6", "col-4", "col-3"];
  // number of columns
  let numColumns = Math.max.apply(Math, fieldsIds.map((idField) => ( fields[idField].column )));

  let fieldsByNumColumn = [];

  for (let nColumn = 1; nColumn <= numColumns; nColumn++) {
    fieldsByNumColumn.push(
      fieldsIds.map((idField) => (
        fields[idField]
      )).filter(field => field.column === nColumn).sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        }
        if (a.order < b.order) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    );
  }

  return (
    <div className="col-12">
      <div className="row intesectiontitle ">
          {title}
      </div>
      <div className="row">

        {fieldsByNumColumn.map((fieldArray, index) => (
            <SectionColumn 
              key={index}
              fieldsColumn={fieldArray}
              columnClass={columnClassName[numColumns-1]}
            />
          ))}


        {/* <div className={columnClassName[numColumns-1]}>
          {fieldsByNumColumn.map((fieldArray) => (
            fieldArray.map((field) => (
              <Field 
                key={field.id} 
                field={field}
              />
            ))
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Section;
