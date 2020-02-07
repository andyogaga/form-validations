import {
  wait,
  waitForElement,
  fireEvent,
  render
} from "@testing-library/react";
import React from "react";
import Home from "../HomeContainer";

// Test cases
/**
 * that the page renders with disabled button
 * that no error shows on page render
 */

describe("Home Tests", () => {
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
    const { queryByLabelText, queryAllByText, debug } = render(<Home />);
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
      expect(emptyErrors.length).toBe(8)
    });
  });

  it("should confirm that the first name and last name was entered", () => {
    const { queryByLabelText, queryAllByText, debug } = render(<Home />);
   
  })
});
