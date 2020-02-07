import {
  wait,
  waitForElement,
  fireEvent,
  render,
  cleanup
} from "@testing-library/react";
import React from "react";
import Home from "../HomeContainer";

describe("Home Tests", () => {
  afterEach(cleanup);
  it("should load the document to the DOM with a disabled button", () => {
    const { queryByText } = render(<Home />);
    const submitButton = queryByText("Complete the form to Submit");
    expect(submitButton).not.toBeNull();
  });

  it("should not show errors when the pages load", () => {
    const { queryByText } = render(<Home />);
    const emptyError = queryByText("Required!");
    expect(emptyError).toBeNull();
  });

  it("should show errors when the fields are touched but empty", async () => {
    const { queryByLabelText, queryAllByText } = render(<Home />);
    const fullNameInput = queryByLabelText("Full name");
    const emailInput = queryByLabelText("Email");
    const phoneInput = queryByLabelText("Phone number");
    const passwordInput = queryByLabelText("Password");
    const confirmPasswordInput = queryByLabelText("Confirm Password");
    const cardnumberInput = queryByLabelText("Card Number");
    const expirationDateInput = queryByLabelText("Expiration Date");
    const pinInput = queryByLabelText("PIN");

    fireEvent.blur(fullNameInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(phoneInput);
    fireEvent.blur(passwordInput);
    fireEvent.blur(confirmPasswordInput);
    fireEvent.blur(cardnumberInput);
    fireEvent.blur(expirationDateInput);
    fireEvent.blur(pinInput);

    await wait(() => {
      const emptyErrors = queryAllByText("Required!");
      expect(emptyErrors.length).toBe(8);
    });
  });

  it("should not accept only one name", async () => {
    const { queryByLabelText, queryByTestId } = render(<Home />);
    const fullNameInput = queryByLabelText("Full name");
    fireEvent.change(fullNameInput, {
      target: { value: "Andy" }
    });
    fireEvent.blur(fullNameInput);
    const nameError = await waitForElement(() => queryByTestId("name-error"));
    await wait(() => {
      expect(nameError.textContent).toBe("Please enter your full name");
    });
  });

  it("should confirm that the first name and last name was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const fullNameInput = queryByLabelText("Full name");
    fireEvent.change(fullNameInput, {
      target: { value: "Andy Ogaga" }
    });
    fireEvent.blur(fullNameInput);
    await wait(() => {
      const nameError = queryByTestId("name-error");
      expect(nameError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should not accept incorrect email", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const emailInput = queryByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@email" }
    });
    fireEvent.blur(emailInput);
    const emailError = await waitForElement(() => queryByTestId("email-error"));
    await wait(() => {
      expect(emailError.textContent).toBe("Please enter valid email");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should confirm that the email was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const emailInput = queryByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@email.com" }
    });
    fireEvent.blur(emailInput);
    await wait(() => {
      const emailError = queryByTestId("email-error");
      expect(emailError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should confirm that the email was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const emailInput = queryByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@email.com" }
    });
    fireEvent.blur(emailInput);
    await wait(() => {
      const emailError = queryByTestId("email-error");
      expect(emailError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });
});
