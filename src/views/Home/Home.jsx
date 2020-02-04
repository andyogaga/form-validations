import React from "react";
import { Container, Col, Form } from "reactstrap";
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
      return /(([A-Z]+\D)\s([A-Z]+\D))/gi.test("HI");
    })
});

const Home = () => {
  const submit = values => {};
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
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
};

export default Home;
