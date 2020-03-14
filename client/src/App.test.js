import React from "react";
import { cleanup, render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const app = render(<App />);
    expect(app.getByText(/hello/i).textContent).toBe("Hello, World!");
  });
});
