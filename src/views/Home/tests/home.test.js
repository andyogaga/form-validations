import {wait, waitForElement, fireEvent, render} from '@testing-library/react';
import React from 'react';
import Home from '../HomeContainer';

// Test cases
/**
 * that the page renders with disabled button
 * that no error shows on page render
 */

describe("Home Tests", () => {
  it("should load the document to the DOM with a disabled button", () => {
    const {queryByText} = render(<Home />);
    const submitButton = queryByText("Complete the form to Submit");
    expect(submitButton).not.toBeNull();
  });

  it("should not show errors when the pages load", () => {
    const {queryByText} = render(<Home />);
    const emptyError = queryByText("Required!");
    expect(emptyError).toBeNull();
  });

  it("should not show errors when the pages load", () => {
    const {queryByText, queryAllByText} = render(<Home />);
    // const emptyError = queryByText("Required!");
    // expect(emptyError).toBeNull();
  });
})