import React from "react";
import useGetFormDefinition from "../../../hooks/api/useGetFormDefinition";
import useSendFormData from "../../../hooks/api/useSendFormData";
import Section from "../section/section.comp";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import refresh from "../../../images/refresh.png"
import enterOnce from "../../../images/ICONGO.gif"
import "./form.css";

function Form() {
  const interfaceNameFromQueryString = "project";
  const { error, isLoading, data } = useGetFormDefinition(
    interfaceNameFromQueryString
  );    

  const sendDataToClarity = useSendFormData();

  const queryCache = useQueryCache();

  return (
    <div className="container">
      {isLoading && <div>Loading</div>}
      {error && <div>{error.title}</div>}
      {data ? (
        <>
          <div className="row">
            <div className="col-12">
                <h1>{data.form.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label className="vision-required">*</label>
              <label>= Required</label>
            </div>
            <div className="col-2">
              <label className="vision-unique">*</label>
              <label>= Unique</label>
            </div>
            <div className="col-2">
              <img src={enterOnce} className="vision-enterOnce" alt="Enter Once" />
              <label>= Enter Once</label>
            </div>
            <div className="col-6 text-right">
              <img src={refresh} className="vision-refresh" alt="Refresh" />
              <br/>
              <label>Actions</label>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {data.form.sectionsIds.map((sectionId) => (
                <Section
                  key={sectionId}
                  section={data.sections[sectionId]}
                  fields={data.fields}
                  staticLookups={data.staticLookups}
                ></Section>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <div className="row">
        <div className="col-12 mt-1">
          <button className="btn btn-secondary" onClick={sendDataToClarity}>Save</button>
          <button className="btn btn-secondary ml-2" onClick={()=>{
            queryCache.invalidateQueries(ApiEndPoints.GetForm);
          }}>Refresh</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
