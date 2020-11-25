import React from "react";
import { queryCache } from "react-query";
import { ApiEndPoints } from "../../../api";
import { IInterfaceForm } from "../../../shared/contracts/types";
import "./interfaceActions.css";

interface IActionsProps {
}

const InterfaceActions: React.FC<IActionsProps> = () => {

  const  data = queryCache.getQueryData<IInterfaceForm>([ApiEndPoints.GetForm]);

  const onClickProcess = (e:any) => {
    console.log('onClickProcess', e);
  }

  return (    
    <>
      <div className="actions">
        <label>Actions ▾</label>
        <ul className="actions-menu">
          { 
            data?.events.map((event) => (
              <li>
                {event.action === "LINK" && <a href={event.url} target="_blank">{event.name}</a>}
                {event.action === "PRC" && event.disabled && <a href='#' className="isDisabled">{event.name}</a>}
                {event.action === "PRC" && !event.disabled && <a href='#' onClick={onClickProcess}>{event.name}</a>}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default InterfaceActions;
