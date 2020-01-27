import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData } from "../api"; // getData is the component making the API call
import StarWarsCharacters from "./StarWarsCharacters";

// jest.mock()
// Anything that gets exported from "../api" is going to have a mock function created for it
// jest.mock("../api");

const initialData = {
    next: "https://swapi.co/api/people/?page=2",
    previous: null
};

const mockData = {
    next: "https://swapi.co/api/people/?page=2",
    previous: "https://swapi.co/api/people/?page=1"
}

test("renders the StarWarsCharacters component with the prev button", () => {
  // AAA Arrange, Act, Assert
  const { getByText } = render(<StarWarsCharacters />);
  getByText("Previous");
});

test("renders the StarWarsCharacters component with the next button", () => {
  // AAA Arrange, Act, Assert
  const { getByText } = render(<StarWarsCharacters />);
  getByText("Next");
});

test("fires the next button to make another axios call", () => {
  getData.mockResolvedValueOnce(initialData)
  const { getByText } = render(<StarWarsCharacters />);
  const nextButton = getByText("Next");
  fireEvent.click(nextButton);
  expect(getData).toHaveBeenCalledTimes(1);
});
