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
    <div>
      {isLoading && <div>Loading</div>}
      {error && <div>{error.title}</div>}
      {data ? (
        <div>
          <h1>{data.form.title}</h1>
          <div>
            {data.form.sectionsIds.map((sectionId) => (
              <Section
                key={sectionId}
                section={data.sections[sectionId]}
                fields={data.fields}
              ></Section>
            ))}
          </div>
        </div>
      ) : null}

      <br/>
      <div>
        <button onClick={sendDataToClarity}>Save data</button>
        <button onClick={()=>{
          queryCache.invalidateQueries(ApiEndPoints.GetForm);
        }}>Refresh data</button>
      </div>
    </div>
  );
}

export default Form;
