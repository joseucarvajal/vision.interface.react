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
              <h1>{data.form.name}</h1>
          </div>
          
          <div className="row">
                <table width="100%">
                  <thead>
                  </thead>
                  <tbody>
                    <tr>
                        <td align="left" width="10%">
                            <label className="vision-required">*</label>
                            <label>= Required</label>
                        </td>
                        <td align="left" width="10%">
                            <label className="vision-unique">*</label>
                            <label>= Unique</label>
                        </td>
                        <td align="left" width="10%">
                            <img src={enterOnce} className="vision-enterOnce" alt="Enter Once" />
                            <label>= Enter Once</label>
                        </td>
                        <td align="right" width="70%">
                                <img src={refresh} className="vision-refresh" alt="Refresh" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} align="right">
                          <label>Actions</label>
                        </td>
                    </tr>
                  </tbody>
                </table>
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
