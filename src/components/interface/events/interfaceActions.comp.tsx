import React from "react";
import { queryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import { IField, IInterfaceForm, IEvent, IFieldHash } from "../../../shared/contracts/types";
import "./interfaceActions.css";

interface IActionsProps {
  events?: IEvent[];
  fields?: IFieldHash;
  setFieldValue: (field:IField, value:string) => void;
}

const InterfaceActions: React.FC<IActionsProps> = ({ events, fields, setFieldValue }) => {

  const ProcessEvent = (id: string, value: string) => {
      if(fields){
        setFieldValue(fields[id], value);
      }
  }

  return (    
    <>
      <div className="actions">
        <label>Actions ▾</label>
        <ul className="actions-menu">
          { 
            events?.map((event) => (
              <li>
                {event.action === "LINK" && <a href={event.url} target="_blank">{event.name}</a>}
                {event.action === "PRC" && event.disabled && <a href='#' className="isDisabled">{event.name}</a>}
                {event.action === "PRC" && !event.disabled && 
                  <a href='#'  
                    onClick={()=>{
                      ProcessEvent(event.attributeId, event.value);                      
                    }}
                  >{event.name}</a>
                }
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default InterfaceActions;
