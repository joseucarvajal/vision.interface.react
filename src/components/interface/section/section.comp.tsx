import React from "react";
import { ISection, IFieldHash, IField } from "../../../shared/contracts/types";
import SectionColumn from "./sectionColumn/sectionColumn.comp";
import "./section.css";

interface ISectionProps {
  section: ISection;
  fields: IFieldHash;
  setFieldValue: (field:IField, value:string) => void;
}

const Section: React.FC<ISectionProps> = ({ section, fields, setFieldValue }) => {
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
      )).filter(field => field.column === nColumn && !field.hidden).sort((a, b) => {
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
    <div className="card">
      <h5 className="card-header">&nbsp;{title}</h5>
      <div className="card-body">
        <div className="col-12">
          <div className="row">
            {fieldsByNumColumn.map((fieldArray, index) => (
                <SectionColumn 
                  key={index}
                  fieldsColumn={fieldArray}
                  columnClass={columnClassName[numColumns-1]}
                  setFieldValue={setFieldValue}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
