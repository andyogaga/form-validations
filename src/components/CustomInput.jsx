import React from "react";
import { Input } from "reactstrap";

const CustomInput = ({
  name,
  placeholder,
  label,
  values,
  onKeyDown = () => {},
  handleChange,
  handleBlur,
  required = false,
  errors,
  touched,
  type = "text",
  isSubmitting
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Input
        name={name}
        id={name}
        placeholder={placeholder}
        type={type}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        invalid={errors[name] && touched[name]}
        onKeyDown={onKeyDown}
        disabled={isSubmitting}
      />
      {errors[name] && touched[name] && (
        <span className="error" style={{fontSize: 11, color: "red"}}>{errors[name]}</span>
      )}
    </div>
  );
};

export default CustomInput;
