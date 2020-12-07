import React, { useEffect, useReducer, useState } from "react";
import useGetFormDefinition from "../../../hooks/api/useGetFormDefinition";
import useSendFormData from "../../../hooks/api/useSendFormData";
import Section from "../section/section.comp";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import refresh from "../../../images/refresh.png"
import enterOnce from "../../../images/ICONGO.gif"
import "./form.css";
import { IField, IInterfaceForm } from "../../../shared/contracts/types";
import InterfaceActions from "../events/interfaceActions.comp";
import { Alert } from "react-bootstrap";

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

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const env = params.get('env');
  const interfaceCode = params.get('interfaceCode');
  const formType = params.get('formType');
  const id = params.get('id');
  const parentCode = params.get('parentCode');

  const { error, isLoading, data } = useGetFormDefinition(
    env ? env : "",
    interfaceCode ? interfaceCode : "",
    formType ? formType : '',
    id ? id : '',
    parentCode ? parentCode : ''
  );

  const [state, dispatch] = useReducer(interfaceReducer, data);

  const reloadForm = () => {
    console.log('reloadForm');
  }

  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const onClickSave = useSendFormData(state);

  const onClickSaveLocal = async ()=> {
    const result = await onClickSave();

    queryCache.refetchQueries(ApiEndPoints.GetForm);

    setIsError(!result);
    setShowAlert(true);

    window.setTimeout(()=>{
      setShowAlert(false)
    },5000)

  };
  
  const onClickSaveAndReturn = useSendFormData(state);

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


  let actionRefresh;
  if(formType !== '0'){
    actionRefresh = 
    <div>
      <img src={refresh} className="vision-refresh" alt="Refresh" 
        onClick={()=>{
          reloadForm();
        }}
      />
      <InterfaceActions key="actions"
        events={state?.events}
        fields={state?.fields}
        setFieldValue={setFieldValue}/>
    </div>;
  }


  let saveDisabled = false;
  for (var key in state?.fields) {
      if(state?.fields[key].required && state?.fields[key].value === ''){
        saveDisabled =  true;
      }
  }

  let saveButtons;

  if(formType === '0' || formType === '2'){
    saveButtons = 
    <>
        <button className="btn btn-secondary ml-2" onClick={onClickSaveLocal} disabled={saveDisabled}>Save</button>
        <button className="btn btn-secondary ml-2" onClick={onClickSaveAndReturn} disabled={saveDisabled}>Save And Return</button>
    </>;
  }


  const afterSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("event", event);
  }

  const onClickReturn = () =>{    
  }


  return (
    <div className="container">
    
    { showAlert && isError &&
      <Alert variant="danger">
        <Alert.Heading></Alert.Heading>
        <p>Error occurred please contact administrator</p>
        <hr />
      </Alert>
    }
    { showAlert && !isError &&
      <Alert variant="success" show={showAlert}>
        <Alert.Heading></Alert.Heading>
        <p>Item saved successfully</p>
        <hr />
      </Alert>
    }


      {/* <form onSubmit = {afterSubmission} className="form-inside-input"> */}
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
              <div className="col-2">
              </div>
              <div className="col-2">
              </div>
              <div className="col-2 vision-right">
                {actionRefresh}
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
          {saveButtons}
          <button className="btn btn-secondary ml-2" onClick={onClickReturn}>Return</button>
          <button className="btn btn-secondary ml-2" 
            onClick={()=>{
              const data = queryCache.getQueryData<IInterfaceForm>(ApiEndPoints.GetForm);            
              setInitialState(data);
            }}>Refresh
          </button>
          </div>
        </div>
      {/* </form> */}
    </div>
  );
}

export default Form;
