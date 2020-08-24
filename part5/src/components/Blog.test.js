import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    author: "Some Author",
    url: "google.com",
    title: "Some Greate Title",
    likes: 2,
    user: {
      username: "test2",
    },
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(blog.author);

  expect(component.container).toHaveTextContent(blog.title);

  expect(component.container.querySelector(".additionalInfo")).toHaveStyle(
    "display: none"
  );
});

test("clicking the unwrap button causes the appearence of url and likes values", () => {
  const blog = {
    author: "Some Author",
    url: "google.com",
    title: "Some Greate Title",
    likes: 2,
    user: {
      username: "test2",
    },
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  const div = component.container.querySelector(".additionalInfo");
  expect(div).not.toHaveStyle("display: none");
});

test("if the like button is clicked twice, the event handler the component received as props is called twice", () => {
  const blog = {
    author: "Some Author",
    url: "google.com",
    title: "Some Greate Title",
    likes: 2,
    user: {
      username: "test2",
    },
  };

  const increaseLikes = jest.fn();

  const component = render(<Blog blog={blog} increaseLikes={increaseLikes} />);

  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(increaseLikes.mock.calls).toHaveLength(2);
});
