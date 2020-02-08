import {
  wait,
  waitForElement,
  fireEvent,
  render,
  cleanup
} from "@testing-library/react";
import React from "react";
import Home from "../HomeContainer";
import Dashboard from "../../Dashboard/Dashboard";

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

  it("should not accept incorrect phone", async () => {
    const { queryByLabelText, queryByTestId, queryByText, rerender} = render(<Home />);
    const phoneInput = queryByLabelText("Phone number");
    // Testing for lesser number of letters
    fireEvent.change(phoneInput, {
      target: { value: "0804534569" }
    });
    fireEvent.blur(phoneInput);
    const phoneError = await waitForElement(() => queryByTestId("phone-error"));
    await wait(() => {
      expect(phoneError.textContent).toBe("Your Phone number must have 11 Digits");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
    rerender(<Home />);
    // Testing for more number of digits
    fireEvent.change(phoneInput, {
      target: { value: "080453456956" }
    });
    fireEvent.blur(phoneInput);
    const phoneError2 = await waitForElement(() => queryByTestId("phone-error"));
    await wait(() => {
      expect(phoneError2.textContent).toBe("Your Phone number must have 11 Digits");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });

    rerender(<Home />);
    // Testing for invalid Nigerian phone number
    fireEvent.change(phoneInput, {
      target: { value: "02045345695" }
    });
    fireEvent.blur(phoneInput);
    const phoneError3 = await waitForElement(() => queryByTestId("phone-error"));
    await wait(() => {
      expect(phoneError3.textContent).toBe("Please enter valid phone number");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should confirm that the phone was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const phoneInput = queryByLabelText("Phone number");
    fireEvent.change(phoneInput, {
      target: { value: "07012345678" }
    });
    fireEvent.blur(phoneInput);
    await wait(() => {
      const phoneError = queryByTestId("phone-error");
      expect(phoneError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });


  it("should not accept incorrect password", async () => {
    const { queryByLabelText, queryByTestId, queryByText, rerender} = render(<Home />);
    const passwordInput = queryByLabelText("Password");
    // Testing for password with less than 6 characters
    fireEvent.change(passwordInput, {
      target: { value: "Pass" }
    });
    fireEvent.blur(passwordInput);
    const passwordError = await waitForElement(() => queryByTestId("password-error"));
    await wait(() => {
      expect(passwordError.textContent).toBe("Your password is too short");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
    rerender(<Home />);
    // Testing for no uppercase in password
    fireEvent.change(passwordInput, {
      target: { value: "password" }
    });
    fireEvent.blur(passwordInput);
    const passwordError2 = await waitForElement(() => queryByTestId("password-error"));
    await wait(() => {
      expect(passwordError2.textContent).toBe("Your password must have at least One Uppercase character, One Number, One special character and at least Six characters.");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });

    rerender(<Home />);
    // Testing without special character
    fireEvent.change(passwordInput, {
      target: { value: "Pass1234" }
    });
    fireEvent.blur(passwordInput);
    const passwordError3 = await waitForElement(() => queryByTestId("password-error"));
    await wait(() => {
      expect(passwordError3.textContent).toBe("Your password must have at least One Uppercase character, One Number, One special character and at least Six characters.");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should confirm that the password was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const passwordInput = queryByLabelText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "Pass123*" }
    });
    fireEvent.blur(passwordInput);
    await wait(() => {
      const passwordError = queryByTestId("password-error");
      expect(passwordError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should not accept unequal confirm password", async () => {
    const { queryByLabelText, queryByTestId, queryByText} = render(<Home />);
    const confirmPasswordInput = queryByLabelText("Confirm Password");
    const passwordInput = queryByLabelText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "Pass123*" }
    });
    fireEvent.blur(passwordInput);
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Pass1234" }
    });
    fireEvent.blur(confirmPasswordInput);
    const passwordError = await waitForElement(() => queryByTestId("confirmPassword-error"));
    await wait(() => {
      expect(passwordError.textContent).toBe("Must be equal to Password");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should confirm that the confirm password was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const confirmPasswordInput = queryByLabelText("Confirm Password");
    const passwordInput = queryByLabelText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "Pass123*" }
    });
    fireEvent.blur(passwordInput);
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Pass123*" }
    });
    fireEvent.blur(confirmPasswordInput);
    await wait(() => {
      const passwordError = queryByTestId("confirmPassword-error");
      expect(passwordError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should not accept invalid Card Number", async () => {
    const { queryByLabelText, queryByTestId, queryByText, rerender, debug} = render(<Home />);
    const cardnumberInput = queryByLabelText("Card Number");
    // Test for shorter digits
    fireEvent.change(cardnumberInput, {
      target: { value: "1234 1234 1234 1" }
    });
    fireEvent.blur(cardnumberInput);
    const cardNumberError = await waitForElement(() => queryByTestId("cardNumber-error"));
    await wait(() => {
      expect(cardNumberError.textContent).toBe("This Card number is invalid, please use format XXXX XXXX XXXX XXXX");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
    // Test for longer digits
    rerender(<Home />);
    fireEvent.change(cardnumberInput, {
      target: { value: "1234 1234 1234 1123344" }
    });
    fireEvent.blur(cardnumberInput);
    const cardNumberError2 = await waitForElement(() => queryByTestId("cardNumber-error"));
    await wait(() => {
      expect(cardNumberError2.textContent).toBe("This Card number is invalid, please use format XXXX XXXX XXXX XXXX");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
    // Test for invalid characters
    rerender(<Home />);
    fireEvent.change(cardnumberInput, {
      target: { value: "1234 1*34 1E34 1123" }
    });
    fireEvent.blur(cardnumberInput);
    const cardNumberError3 = await waitForElement(() => queryByTestId("cardNumber-error"));
    await wait(() => {
      expect(cardNumberError3.textContent).toBe("Please enter a valid Card Number of format XXXX XXXX XXXX XXXX");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });

    // Test for characters without white spaces
    rerender(<Home />);
    fireEvent.change(cardnumberInput, {
      target: { value: "12341234 1E34 1123 " }
    });
    fireEvent.blur(cardnumberInput);
    const cardNumberError4 = await waitForElement(() => queryByTestId("cardNumber-error"));
    await wait(() => {
      expect(cardNumberError4.textContent).toBe("Please enter a valid Card Number of format XXXX XXXX XXXX XXXX");
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

  it("should confirm that the Card Number was entered correctly", async () => {
    const { queryByLabelText, queryByTestId, queryByText } = render(<Home />);
    const cardNumberInput = queryByLabelText("Card Number");
    fireEvent.change(cardNumberInput, {
      target: { value: "1234 1234 1234 1234" }
    });
    fireEvent.blur(cardNumberInput);
    await wait(() => {
      const cardNumberError = queryByTestId("cardNumber-error");
      expect(cardNumberError).toBeNull();
      const submitButton = queryByText("Complete the form to Submit");
      expect(submitButton).not.toBeNull();
    });
  });

});
