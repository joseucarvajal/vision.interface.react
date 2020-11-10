import React from "react";
import useGetFormDefinition from "../../../hooks/api/useGetFormDefinition";
import useSendFormData from "../../../hooks/api/useSendFormData";
import Section from "../section/section.comp";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";

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
              <div className="col-6">
                  Ayudas
              </div>
              <div className="col-6">
                  <div className="row">
                      actualizar
                  </div>
                  <div className="row">
                      acciones
                  </div>
              </div>
          </div>
          
          <div className="row">
                {data.form.sectionsIds.map((sectionId) => (
                  <Section
                    key={sectionId}
                    section={data.sections[sectionId]}
                    fields={data.fields}
                  ></Section>
                ))}
          </div>
        </>
      ) : null}

      <div className="row">
        <button onClick={sendDataToClarity}>Save data</button>
        <button onClick={()=>{
          queryCache.invalidateQueries(ApiEndPoints.GetForm);
        }}>Refresh data</button>
      </div>
    </div>
  );
}

export default Form;
