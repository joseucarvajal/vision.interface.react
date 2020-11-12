import React, { useState, useEffect } from "react";
import { IField, IInterfaceForm } from "../../../../shared/contracts/types";
import { useQueryCache } from "react-query";
import { ApiEndPoints } from "../../../../api";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import calendarImg from "../../../../images/CALENDAR.gif"
import "./fieldDate.css";

interface IFieldDateProps {
  field: IField;
}

const FieldDate: React.FC<IFieldDateProps> = ({ field }) => {
  const { value } = field;
  const queryCache = useQueryCache();

  const getDateValue = (dateString: string) => {
    if(!dateString)
    {
      return null;
    }
    let newValue = dateString;
    if (value.indexOf('T') !== -1) {
      newValue = dateString.split('T')[0] + 'T00:00:00Z';
    }
    else {
      newValue += 'T00:00:00Z';
    }

    let newDate = new Date(newValue);

    //To support mutiple timezones
    newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000);

    return newDate;
  };

  const formatDate = (date: Date) => {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
  }

  const onChange = (date: Date) => {
    setFieldValue(date);
    queryCache.setQueryData<IInterfaceForm>(
      [ApiEndPoints.GetForm],
      (previous: any) => {
        console.log({previous});
        return {
          ...previous,
          fields:{
            ...previous.fields,
            [field.id]:{
              ...field,
              value: (date == null ? "" : formatDate(date))
            }
          }
        };
      }
    );
  }

  const [fieldValue, setFieldValue] = useState(getDateValue(value));

  useEffect(() => {
      setFieldValue(getDateValue(field.value));
  }, [field.value]);

  const imgTitle = `Select ${field.name}`;

  return (
    <label>
      <div className="row">
        <div className="col-7">
      <DatePicker className="form-control"
        selected={fieldValue} 
        onChange={onChange} 
        disabled={field.readOnly}
        title={field.tooltip}
        todayButton="Today"
        strictParsing
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        isClearable
      />
      </div>
      <div className="col-1">
      <img className="vision-datepicker"
        src={calendarImg} 
        title={imgTitle}
        alt={imgTitle}/> 
        </div>
        </div>
    </label>
  );
};

export default FieldDate;
