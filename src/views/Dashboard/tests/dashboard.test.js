import {
  render,
  cleanup,
  fireEvent,
  wait,
  waitForElement
} from "@testing-library/react";
import React from "react";
import Dashboard from "../Dashboard";

describe("Dashboard Tests", () => {
  afterEach(cleanup);
  it("should load the document to the DOM with a header", () => {
    const { queryByText, queryByTestId } = render(<Dashboard />);
    const logoElement = queryByTestId("logo-svg");
    const homeButton = queryByText("Home");

    expect(logoElement).not.toBeNull();
    expect(homeButton).not.toBeNull();
  });

  it("should display dashboard tabs", () => {
    const { queryByText } = render(<Dashboard />);
    const dashboardTab = queryByText("Dashboard");
    const welcome = queryByText("Welcome to Softcom!");
    expect(dashboardTab).not.toBeNull();
    expect(welcome).not.toBeNull();
  });

  it("should display switch tabs on tab click", async () => {
    const { queryByText } = render(<Dashboard />);
    const reportsTab = queryByText("Reports");
    fireEvent.click(reportsTab);
    const user = await waitForElement(() =>
        queryByText("The User reports are shown here")
      );
    await wait( () => {
      const welcome = queryByText("Welcome to Softcom!");
      expect(welcome).not.toBeNull();
      expect(user).not.toBeNull();
    });
  });

  it("should display switch tabs on dashboard click", async () => {
    const { queryByText } = render(<Dashboard />);
    const dashboardTab = queryByText("Dashboard");
    fireEvent.click(dashboardTab);
    await wait( () => {
      const welcome = queryByText("Welcome to Softcom!")
      expect(welcome).not.toBeNull();
    });
  });
});
