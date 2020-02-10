import React from "react";
import { Input } from "reactstrap";
import PropTypes from 'prop-types';

/**
 * 
 * @param {object} param0 - destructuring things needed in the form field for clean code
 */
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
      {errors[name] && touched[name] && (  // This is the error element to be shown if field is touched or does not pass the schema tests
        <span className="error" data-testid={`${name}-error`} style={{fontSize: 11, color: "red"}}>{errors[name]}</span>
      )}
    </div>
  );
};

CustomInput.defaultProps = {
  errors: {},
  handleBlur: () => {},
  handleChange: () => {},
  isSubmitting: false,
  label: "",
  name: "",
  onKeyDown: () => {},
  placeholder: "",
  required: false,
  touched: {},
  type: "",
  values: {}
}

CustomInput.propTypes = {
  errors: PropTypes.any,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  touched: PropTypes.shape({}),
  type: PropTypes.string,
  values: PropTypes.shape({})
}

export default CustomInput;
