import React from "react";
import { IField } from "../../../../shared/contracts/types";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import calendarImg from "../../../../images/CALENDAR.gif"
import "./fieldDate.css";

interface IFieldDateProps {
  field: IField;
  setFieldValue: (field: IField, value: string) => void;
}

const FieldDate: React.FC<IFieldDateProps> = ({ field, setFieldValue }) => {
  
  const { value } = field;

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
    setFieldValue(field, (date == null ? "" : formatDate(date)));
  }

  const imgTitle = `Select ${field.name}`;

  return (
    <label>
      <div className="row">
        <div className="col-7">
      <DatePicker className="form-control"
        selected={getDateValue(value)} 
        onChange={onChange} 
        disabled={field.readOnly}
        title={field.tooltip}
        todayButton="Today"
        strictParsing
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        isClearable={!field.readOnly}
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
