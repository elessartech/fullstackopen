import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlogForm from "./NewBlogForm";

test("the form calls the event handler it received as props with the right details when a new blog is called", () => {
  const createNewBlog = jest.fn();

  const component = render(<NewBlogForm createNewBlog={createNewBlog} />);

  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const title = component.container.querySelector("#title");
  const form = component.container.querySelector("form");

  fireEvent.change(author, {
    target: { value: "testing of forms could be easier" },
  });

  fireEvent.change(url, {
    target: { value: "testing of forms could be easier" },
  });

  fireEvent.change(title, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.submit(form);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0].author).toBe(
    "testing of forms could be easier"
  );
  expect(createNewBlog.mock.calls[0][0].url).toBe(
    "testing of forms could be easier"
  );
  expect(createNewBlog.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  );
});
