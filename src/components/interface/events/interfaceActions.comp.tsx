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
    <nav className="navbar navbar-expand-sm">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
            Actions
          </a>
          <div className="dropdown-menu">
            { 
              events?.map((event) => (
                <>
                  {event.action === "LINK" && <a className="dropdown-item" href={event.url} target="_blank">{event.name}</a>}
                  {event.action === "PRC" && event.disabled && <a className="dropdown-item isDisabled" href='#'>{event.name}</a>}
                  {event.action === "PRC" && !event.disabled && 
                    <a className="dropdown-item" href='#'  
                      onClick={()=>{
                        ProcessEvent(event.attributeId, event.value);                      
                      }}
                    >{event.name}</a>
                  }
                </>
              ))
            }
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default InterfaceActions;
