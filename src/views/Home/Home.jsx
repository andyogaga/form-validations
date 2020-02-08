import React from "react";
import PropTypes from 'prop-types'
import { Container, Col, Form, Row, Button, Jumbotron } from "reactstrap";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import * as Yup from "yup";

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

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .test("is-fullname", "Please enter your full name", function(value) {
      return /(^[A-Z]{2,})\s{1}([A-Z]{2,})$/gi.test(value);
    }),
  email: Yup.string()
    .required("Required!")
    .test("is-email", "Please enter valid email", function(value) {
      return /(^[a-z]+)[.-]?([a-z]+)@{1}([a-z0-9]{2,})\.([a-z]{2,7})/gi.test(
        value
      );
    }),
  phone: Yup.string()
    .required("Required!")
    .min(11, "Your Phone number must have 11 Digits")
    .max(11, "Your Phone number must have 11 Digits")
    .test("is-phone", "Please enter valid phone number", function(value) {
      return /^([0]{1}[7-9]{1}[0-1]{1})([0-9]{8})$/.test(value);
    }),
  password: Yup.string()
    .required("Required!")
    .min(6, "Your password is too short")
    .test(
      "is-password",
      "Your password must have at least One Uppercase character, One Number, One special character and at least Six characters.",
      function(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
          value
        );
      }
    ),
  confirmPassword: Yup.string()
    .required("Required!")
    .test("is-same", "Must be equal to Password", function(value) {
      return this.parent.password === value;
    }),
  cardNumber: Yup.string()
    .required("Required!")
    .min(
      19,
      "This Card number is invalid, please use format XXXX XXXX XXXX XXXX"
    )
    .max(
      19,
      "This Card number is invalid, please use format XXXX XXXX XXXX XXXX"
    )
    .test(
      "is-cardNumber",
      "Please enter a valid Card Number of format XXXX XXXX XXXX XXXX",
      function(value) {
        return /^(([0-9]{4})\s{1}([0-9]{4})\s{1}([0-9]{4})\s{1}([0-9]{4}))$/.test(
          value
        );
      }
    ),
  expirationDate: Yup.string()
    .required("Required!")
    .test(
      "is-expirationDate",
      "Enter valid date as MM/YY from 1990 - 2029",
      function(value) {
        return /^(([0]{1}[0-9]{1})|([1]{1}[12]{1}))\/[912]{1}[0-9]{1}$/.test(
          value
        );
      }
    ),
  pin: Yup.string()
    .required("Required!")
    .min(4, "Your PIN must be 4 Digits")
    .max(4, "Your PIN must be 4 Digits")
    .test(
      "is-password",
      "Your PIN must be a number and have four characters",
      function(value) {
        return /[0-9]{4}/i.test(value);
      }
    )
});

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

const Home = (props) => {
  const submit = (values, {resetForm, setSubmitting}) => {
    const {history} = props;
    if(Object.keys(values).length === 8){
      setSubmitting(false);
      resetForm()
      history.push("/dashboard");
    }
  };

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
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={formSchema}
        >
          {({ setFieldValue, isValid, ...rest }) => (
            <Form noValidate>
              <CustomInput
                {...rest}
                name="name"
                id="name"
                placeholder="Andy Ogaga"
                label="Full name"
                required={true}
              />
              <CustomInput
                {...rest}
                name="email"
                id="email"
                placeholder="email@example.com"
                label="Email"
                required={true}
              />
              <CustomInput
                {...rest}
                name="phone"
                id="phone"
                placeholder="08112345678"
                label="Phone number"
                required={true}
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
                    required={true}
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
                    required={true}
                  />
                </Col>
              </Row>
              <CustomInput
                {...rest}
                name="cardNumber"
                id="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                label="Card Number"
                required={true}
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
                    required={true}
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
                    required={true}
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
                Object.keys(rest.touched).length !== 8
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
