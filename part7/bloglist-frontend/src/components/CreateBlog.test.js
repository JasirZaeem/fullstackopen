import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CreateBlog from "./CreateBlog";

const testBlog = {
  id: "507f1f77bcf86cd799439011",
  title: "Component testing in react",
  author: "Jasir",
  url: "https://zaeem.dev",
  likes: "9999",
  user: {
    name: "Jasir Zaeem",
    username: "JasirZaeem",
  },
};

test("Submitting the create blog form returns expected data", () => {
  const mockHandler = jest.fn();

  const component = render(<CreateBlog addNewBlog={mockHandler} />);

  const [
    titleInput,
    authorInput,
    urlInput,
  ] = component.container.querySelectorAll("input");

  fireEvent.change(titleInput, {
    target: { value: testBlog.title },
  });

  fireEvent.change(authorInput, {
    target: { value: testBlog.author },
  });

  fireEvent.change(urlInput, {
    target: { value: testBlog.url },
  });

  const submitButton = component.getByText("create");
  fireEvent.click(submitButton);

  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: testBlog.title,
    author: testBlog.author,
    url: testBlog.url,
  });
});
