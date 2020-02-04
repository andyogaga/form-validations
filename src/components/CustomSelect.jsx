import React from "react";
import { Input } from "reactstrap";

const CustomSelect = ({
  name,
  label,
  value,
  handleChange,
  handleBlur,
  required = false,
  error,
  touched,
  list
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>`${label}`</label>
      <Input
        name={name}
        id={name}
        type="select"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        invalid={error && touched}
      >
        <option value="">Select `${label}`</option>
        {list.map(unit => (
          <option key={unit._id} value={unit._id}>{unit.name}</option>
        ))}
      </Input>
      {error && touched && <span className="error">{error}</span>}
    </div>
  );
};

export default CustomSelect;
