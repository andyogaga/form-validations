import React from "react";
import { Container, Col, Form, Row, Input } from "reactstrap";
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
    .test("is-phone", "Please enter valid phone number", function(value) {
      return /^([0]{1}[7-9]{1}[0-1]{1})([0-9]{8})$/.test(value);
    }),
  password: Yup.string()
    .required("Required!")
    .test(
      "is-password",
      "Your password must have at least One Uppercase character, One Number, One special character and at least Six characters.",
      function(value) {
        return /[0-9]/i.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required("Required!")
    .test("is-same", "Must be equal to Password", function(value) {
      return this.parent.password === value;
    }),
  expirationDate: Yup.string()
    .required("Required!")
    .test("is-expirationDate", "Enter valid date as MM/YY", function(value) {
      return /^[0-1]{1}[0-9]\//.test(value);
    }),
  pin: Yup.string()
    .required("Required!")
    .test(
      "is-password",
      "Your PIN must be a number and maximum of four characters",
      function(value) {
        return /[0-9]/i.test(value);
      }
    )
});

const Home = () => {

  const submit = values => {};

  const handleExpirationDateInput = (e, cb) => {
    let { value } = e.target;
    if (value.length < 6) {
      if (value.length === 2) {
        value = /^[0-9]{2}/.test(value) ? `${value}/` : value;
      }
      e.target.value = value;
      cb(e);
    }
  };

  const handlePINKeyInput = (e) => {
    const {key, target: {value}} = e;
    const ALLOWED_KEYS = [
      "Backspace",
      "Delete",
      "ArrowRight",
      "ArrowLeft"
    ];
    const isControlKey = ALLOWED_KEYS.includes(key);
    const isNumberKey = /[0-9]/.test(key);
    if(!isControlKey && !isNumberKey){
      e.preventDefault();
      return;
    }
    if(value.length >= 4 && !isControlKey){
      e.preventDefault();
      return;
    }
  }

  const handleExpirationDateKeyInput = (e) => {
    const {key, target: {value}} = e;
    const ALLOWED_KEYS = [
      "Backspace",
      "Delete"
    ];
    const isControlKey = ALLOWED_KEYS.includes(key);
    const isNumberKey = /[0-9]/.test(key);
    if(!isControlKey && !isNumberKey){
      e.preventDefault();
      return;
    }
    if(value.length === 2 && !isControlKey){
      e.target.value = `${value}/`
      return;
    }
    if(value.length >= 5 && !isControlKey){
      e.preventDefault();
      return;
    }
  }

  return (
    <Container>
      <Col>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={formSchema}
        >
          {({ isSubmitting, ...rest }) => (
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
              />
              <Row>
                <Col>
                  <CustomInput
                    {...rest}
                    name="password"
                    id="password"
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
                    placeholder="******"
                    label="Confirm Password"
                    required={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor={"expirationDate"}>Expiration Date</label>
                    <Input
                      name={"expirationDate"}
                      id={"expirationDate"}
                      placeholder="MM/YY"
                      type="text"
                      value={rest.values.expirationDate}
                      onKeyDown={handleExpirationDateKeyInput}
                      onChange={rest.handleChange}
                      onBlur={rest.handleBlur}
                      required={true}
                      invalid={
                        rest.errors.expirationDate &&
                        rest.touched.expirationDate
                      }
                    />
                    {rest.errors.expirationDate && rest.touched.expirationDate && (
                      <span
                        className="error"
                        style={{ fontSize: 11, color: "red" }}
                      >
                        {rest.errors.expirationDate}
                      </span>
                    )}
                  </div>
                </Col>
                <Col>
                <div className="form-group">
                    <label htmlFor={"pin"}>PIN</label>
                    <Input
                      name={"pin"}
                      id={"pin"}
                      placeholder="****"
                      type="password"
                      value={rest.values.pin}
                      onChange={rest.handleChange}
                      onKeyDown={handlePINKeyInput}
                      onBlur={rest.handleBlur}
                      autoComplete="off"
                      required={true}
                      invalid={
                        rest.errors.pin &&
                        rest.touched.pin
                      }
                    />
                    {rest.errors.pin && rest.touched.pin && (
                      <span
                        className="error"
                        style={{ fontSize: 11, color: "red" }}
                      >
                        {rest.errors.pin}
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
};

export default Home;
