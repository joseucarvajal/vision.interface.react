import React, { useEffect, useReducer } from "react";
import useGetFormDefinition from "../../../hooks/api/useGetFormDefinition";
import useSendFormData from "../../../hooks/api/useSendFormData";
import Section from "../section/section.comp";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import refresh from "../../../images/refresh.png"
import enterOnce from "../../../images/ICONGO.gif"
import "./form.css";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";

export const SET_INPUT_VALUE = "SET_INPUT_VALUE";
export const SET_INITIAL_STATE = "SET_INITIAL_STATE";

export type IFormActionType = {
  type: typeof SET_INPUT_VALUE;
  field: IField;
  value: string;
}
| 
{
  type: typeof SET_INITIAL_STATE;
  state: IInterfaceForm
};

function interfaceReducer(
  state: IInterfaceForm | undefined,
  action: IFormActionType
): IInterfaceForm | undefined {
    
  switch (action.type) {
    case SET_INPUT_VALUE:
      return {
        ...state!,
        fields: {
          ...state?.fields,
          [action.field.id]: {
            ...action.field,
            value: action.value,
          },
        },
      };

    case SET_INITIAL_STATE:
      return action.state;

    default:
      return state;
  }
}

const Form: React.FC = () => {
  const interfaceNameFromQueryString = "project";
  const { error, isLoading, data } = useGetFormDefinition(
    interfaceNameFromQueryString
  );


  const [state, dispatch] = useReducer(interfaceReducer, data);

  const sendDataToClarity = useSendFormData(state);

  const queryCache = useQueryCache();

  const setInitialState = (state: IInterfaceForm | undefined) => {
    if(!state){
      return;
    }

    dispatch({
      type: SET_INITIAL_STATE,
      state
    });
  };

  const setFieldValue = (field: IField, value: string) => {
    dispatch({
      type: SET_INPUT_VALUE,
      field,
      value,
    });
  };

  useEffect(() => {
    if(data){
      setInitialState(data);
    }
  }, [data]);

  return (
    <div className="container">
      {isLoading && <div>Loading</div>}
      {error && <div>{error.title}</div>}
      {state ? (
        <>
          <div className="row">
            <div className="col-12">
                <h1>{state.form.name}</h1>
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
              {state.form.sectionsIds.map((sectionId) => (
                <Section
                  key={sectionId}
                  section={state.sections[sectionId]}
                  fields={state.fields}
                  setFieldValue={setFieldValue}
                ></Section>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <div className="row">
        <div className="col-12 mt-1">
          <button className="btn btn-secondary" onClick={sendDataToClarity}>Save</button>
          <button className="btn btn-secondary ml-2" 
            onClick={()=>{
              const data = queryCache.getQueryData<IInterfaceForm>(ApiEndPoints.GetForm);            
              setInitialState(data);
            }}
          >Refresh</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
