import React from "react";
import PropTypes from 'prop-types'
import { Container, Col, Form, Row, Button, Jumbotron } from "reactstrap";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import * as Yup from "yup";

/**
 * Create initial values for the state of the Form fields
 */
const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  cardNumber: "",
  expirationDate: "",
  pin: ""
};

/**
 * Runs the Yup after every onBlur event on the form field
 * - It checks the values for an empty string and returns required
 * - It checks if the field is touched before checking its field
 * - It returns an error object with the key as the name of the form field if empty string is found
 * 
 * - After every onBlur, I also verify if the inputs follow the particular pattern as required in the instruction
 */
const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .test("is-fullname", "Please enter your full name", function(value) {  // This tests that the format is "Andy Ogaga"
      return /(^[A-Z]{2,})\s{1}([A-Z]{2,})$/gi.test(value);
    }),
  email: Yup.string()
    .required("Required!")
    .test("is-email", "Please enter valid email", function(value) {  // this tests that the input follows email format
      return /(^[a-z]+)[.-]?([a-z]+)@{1}([a-z0-9]{2,})\.([a-z]{2,7})/gi.test(
        value
      );
    }),
  phone: Yup.string()
    .required("Required!")
    .min(11, "Your Phone number must have 11 Digits") // Tests that the "phone.length" is never less than 11
    .max(11, "Your Phone number must have 11 Digits") // Tests that the "phone.length" is never more than 11
    .test("is-phone", "Please enter valid phone number", function(value) { // Tests that the phone number uses the Nigerian format
      return /^([0]{1}[7-9]{1}[0-1]{1})([0-9]{8})$/.test(value);
    }),
  password: Yup.string()
    .required("Required!")
    .min(6, "Your password is too short") // Tests that the "password.length" is never less than 6
    .test(
      "is-password",
      "Your password must have at least One Uppercase character, One Number, One special character and at least Six characters.",
      function(value) { // Tests that the passwod follows the format requested
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
          value
        );
      }
    ),
  confirmPassword: Yup.string()
    .required("Required!")
    .test("is-same", "Must be equal to Password", function(value) { // tests that confirm password is equal to password field
      return this.parent.password === value;
    }),
  cardNumber: Yup.string()
    .required("Required!") // Tests that the field is not left empty
    .min(
      19,
      "This Card number is invalid, please use format XXXX XXXX XXXX XXXX"
    ) // Tests that the "cardNumber.length" is never less than 19 (16 characters with 3 spaces)
    .max(
      19,
      "This Card number is invalid, please use format XXXX XXXX XXXX XXXX"
    )   // Tests that the "cardNumber.length" is never more than 19 (16 characters with 3 spaces)
    .test(
      "is-cardNumber",
      "Please enter a valid Card Number of format XXXX XXXX XXXX XXXX",
      function(value) { // Tests that the card Number follows the exact format and is not more than the requested number
        return /^(([0-9]{4})\s{1}([0-9]{4})\s{1}([0-9]{4})\s{1}([0-9]{4}))$/.test(
          value
        );
      }
    ),
  expirationDate: Yup.string()
    .required("Required!") // Tests that the field is not left empty
    .test(
      "is-expirationDate",
      "Enter valid date as MM/YY from 1990 - 2029",
      function(value) { // Tests that the input follows the format "XX/XX"
        return /^(([0]{1}[0-9]{1})|([1]{1}[12]{1}))\/[912]{1}[0-9]{1}$/.test(
          value
        );
      }
    ),
  pin: Yup.string()
    .required("Required!")
    .min(4, "Your PIN must be 4 Digits") // Tests that the "pin.length" is never less than 4
    .max(4, "Your PIN must be 4 Digits")
    .test(
      "is-password",
      "Your PIN must be a number and have four characters",
      function(value) {
        return /[0-9]{4}/i.test(value); // test that the input characters are 4 and are all digits
      }
    )
});

/**
 * This is used to split the string of the Card Number after 4 characters. It is passed into the onKeyDown event
 * @param {string} prev - the previos value of the input field
 * @param {string} newKey - the key value pressed
 * @param {number} n - the number of times the string is to split after key input
 * 
 * @returns {string} - a well formatted string of format "XXXX XXXX XXX" if n === 4
 */
const splitText = (prev, newKey, n) => {
  const filteredText = prev
    .split("")
    .filter(t => t !== " ")
    .join("");

  const keyToUse =
    (filteredText.length + 1) % n === 0 && filteredText.length <= 14
      ? `${newKey} `
      : newKey;
  let finalText = prev + keyToUse;
  return finalText;
};

/**
 * 
 * @param {object} props - The props object carrying the history for routing
 */
const Home = (props) => {
  /**
   * 
   * @param {object} values - Carries the values of the form fields after the validation is passed from Yup above - i.e. Object.keys(error).length === 0
   * @param {object} param1 - Passes the function to set all values of field to "" and function to set the isSubmitting state to false
   */
  const submit = (values, {resetForm, setSubmitting}) => {
    const {history} = props;
    if(Object.keys(values).length === 8){
      setSubmitting(false);
      resetForm()
      history.push("/dashboard");
    }
  };
  /**
   * this function restricts key input to only numbers and control keys, It also restricts field values to 4 characters
   * @param {object} e - event object for onKeyDown
   */
  const handlePINKeyInput = e => {
    const {
      key,
      target: { value }
    } = e;
    const ALLOWED_KEYS = ["Backspace", "Delete", "ArrowRight", "ArrowLeft"];
    const isControlKey = ALLOWED_KEYS.includes(key);
    const isNumberKey = /[0-9]/.test(key);
    if (!isControlKey && !isNumberKey) {
      e.preventDefault();
      return;
    }
    if (value.length >= 4 && !isControlKey) {
      e.preventDefault();
      return;
    }
  };
/**
 * this function restricts key input to numbers, less than 5 characters and adds a "/" if length is 2
 * @param {object} e - an event object onKeyDown
 * @param {func} cb - a callback function for setting the value of the field based on the present length of the field values
 */
  const handleExpirationDateKeyInput = (e, cb) => {
    const {
      key,
      target: { value }
    } = e;
    const ALLOWED_KEYS = ["Backspace", "Delete", "ArrowRight", "ArrowLeft"];
    const isControlKey = ALLOWED_KEYS.includes(key);
    const isNumberKey = /[0-9]/.test(key);
    if (!isControlKey && !isNumberKey) {
      e.preventDefault();
      return;
    }
    if (value.length >= 5 && !isControlKey) {
      e.preventDefault();
      return;
    }
    if (value.length === 2 && !isControlKey) {
      cb("expirationDate", `${value}/`);
      return;
    }
  };
/**
* this function restricts key input to numbers and " ", less than 19 characters and adds a " " if length is a multiple of 4
* @param {object} e - an event object onKeyDown
* @param {func} cb - a callback function for setting the value of the field based on the present length of the field values
*/
  const handleCardNumberKeyInput = (e, cb) => {
    const {
      key,
      target: { value }
    } = e;
    const ALLOWED_KEYS = ["Backspace", "Delete", " "];
    const isControlKey = ALLOWED_KEYS.includes(key);
    const isNumberKey = /[0-9]/.test(key);
    if (!isControlKey && !isNumberKey) {
      e.preventDefault();
      return;
    }
    if (value.length >= 19 && !isControlKey) {
      e.preventDefault();
      return;
    }
    if (isNumberKey) {
      e.preventDefault();
      const newValue = splitText(value, key, 4);
      cb("cardNumber", newValue);
      return;
    }
  };
 /**
   * this function restricts key input to only numbers and control keys, It also restricts field values to 11 characters
   * @param {object} e - event object for onKeyDown
   */
  const handlePhoneKeyInput = e => {
    const {
      key,
      target: { value }
    } = e;
    const ALLOWED_KEYS = ["Backspace", "Delete"];
    const isControlKey = ALLOWED_KEYS.includes(key);
    const isNumberKey = /[0-9]/.test(key);
    if (!isControlKey && !isNumberKey) {
      e.preventDefault();
      return;
    }
    if (value.length >= 11 && !isControlKey) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Container>
      <Col>
        <br />
        <Jumbotron className="light">
          <h1 className="display-3">Validations</h1>
          <p className="lead">
            This application serves to validate different forms.
          </p>
        </Jumbotron>
        <br />
        <Formik
          initialValues={initialValues} // Initial values
          onSubmit={submit} // onSubmit function
          validationSchema={formSchema} // Validatio schema to provide error object and touched object
        >
          {({ setFieldValue, isValid, ...rest }) => (
            <Form noValidate>
              <CustomInput
                {...rest}
                name="name"
                id="name"
                placeholder="Andy Ogaga"
                label="Full name"
                required
              />
              <CustomInput
                {...rest}
                name="email"
                id="email"
                placeholder="email@example.com"
                label="Email"
                required
              />
              <CustomInput
                {...rest}
                name="phone"
                id="phone"
                placeholder="08112345678"
                label="Phone number"
                required
                onKeyDown={handlePhoneKeyInput}
              />
              <Row>
                <Col>
                  <CustomInput
                    {...rest}
                    name="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    label="Password"
                    required
                  />
                </Col>
                <Col>
                  <CustomInput
                    {...rest}
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    label="Confirm Password"
                    required
                  />
                </Col>
              </Row>
              <CustomInput
                {...rest}
                name="cardNumber"
                id="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                label="Card Number"
                required
                onKeyDown={e => handleCardNumberKeyInput(e, setFieldValue)}
              />
              <Row>
                <Col>
                  <CustomInput
                    {...rest}
                    name="expirationDate"
                    id="expirationDate"
                    placeholder="MM/YY"
                    label="Expiration Date"
                    required
                    onKeyDown={e =>
                      handleExpirationDateKeyInput(e, setFieldValue)
                    }
                  />
                </Col>
                <Col>
                  <CustomInput
                    {...rest}
                    name="pin"
                    id="pin"
                    placeholder="****"
                    label="PIN"
                    required
                    type="password"
                    onKeyDown={handlePINKeyInput}
                  />
                </Col>
              </Row>
              <Button
                className="btn-success"
                disabled={
                  rest.isSubmitting ||
                  !isValid ||
                  Object.keys(rest.touched).length !== 8
                }
                onClick={rest.handleSubmit}
              >
                {rest.isSubmitting ||
                !isValid ||
                Object.keys(rest.touched).length !== 8 // Uses touched to validate and change button from disabled
                  ? "Complete the form to Submit"
                  : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
};

Home.defaultProps = {
  history: {
    push: () => {}
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Home;
