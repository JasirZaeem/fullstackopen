import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

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

test("Blog component renders content", () => {
  const component = render(
    <Blog blog={testBlog} isCreatedByUser={false} likeBlogHandler={() => {}} />
  );

  expect(component.container.querySelector("p").textContent).toBe(
    `${testBlog.title} by ${testBlog.author}`
  );
});

test("shows details when the button is pressed", () => {
  const component = render(
    <Blog blog={testBlog} isCreatedByUser={false} likeBlogHandler={() => {}} />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent(testBlog.url);
  expect(component.container).toHaveTextContent(testBlog.likes);
});

test("pressing like button twice calls the function handler given to it twice", () => {
  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={testBlog}
      isCreatedByUser={false}
      likeBlogHandler={mockHandler}
    />
  );

  const showButton = component.getByText("view");
  fireEvent.click(showButton);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
