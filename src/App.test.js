import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders initially the H1 title", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Hello World/i);
  expect(titleElement).toBeInTheDocument();
});

test("After click to the H1 we should be able to edit the text", async () => {
  const { getByText, findByTestId } = render(<App />);

  fireEvent.click(getByText("Hello World"));

  // Wait for page to update with query text
  const items = await findByTestId("edit-input");
  expect(items).toBeInTheDocument();
});

test("After edit the text with the wrogn text and press enter it should get an error", async () => {
  const { getByText, findByTestId } = render(<App />);

  fireEvent.click(getByText("Hello World"));

  const editInput = await findByTestId("edit-input");

  fireEvent.change(editInput, { target: { value: 'test' } });
  expect(editInput.value).toBe('test');

  fireEvent.keyDown(editInput, { key: 'Enter', keyCode: 13 });

   const titleElement = await findByTestId("error-message")
   expect(titleElement).toBeInTheDocument();

});

test("After edit the text with the correct text and press enter it should get a success icon", async () => {
  const { getByText, findByTestId } = render(<App />);

  fireEvent.click(getByText("Hello World"));

  const editInput = await findByTestId("edit-input");

  fireEvent.change(editInput, { target: { value: 'success' } });
  expect(editInput.value).toBe('success');

  fireEvent.keyDown(editInput, { key: 'Enter', keyCode: 13 });

   const titleElement = await findByTestId("success-message")
   expect(titleElement).toBeInTheDocument();

});
