import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api"; // getData is the component making the API call
import StarWarsCharacters from "./StarWarsCharacters";

// jest.mock()
// Anything that gets exported from "../api" is going to have a mock function created for it
jest.mock("../api");

const initialData = {
  next: "https://swapi.co/api/people/?page=2",
  previous: "null",
  results: [
    { name: "Luke Skywalker", url: "lukeURL" },
    { name: "C-3P0", url: "cURL" }
  ]
};

const mockData = {
  next: "https://swapi.co/api/people/?page=2",
  previous: "https://swapi.co/api/people/?page=1",
  results: [
    { name: "Anakin Skywalker", url: "darthURL" },
    { name: "Wilhuff Tarkin", url: "wURL" }
  ]
};

test("renders the StarWarsCharacters component with the prev button", async () => {
  // AAA Arrange, Act, Assert
  mockGetData.mockResolvedValue(initialData);
  const { getByText } = render(<StarWarsCharacters />);
  await wait(() => expect(getByText(/previous/i)));
});

test("renders the StarWarsCharacters component with the next button", async () => {
  // AAA Arrange, Act, Assert
  mockGetData.mockResolvedValue(initialData);
  const { getByText } = render(<StarWarsCharacters />);
  await wait(() => expect(getByText(/next/i)));
});

test("previous button renders new data", async () => {
  // AAA Arrange, Act, Assert
  mockGetData.mockResolvedValue(mockData);

  const { getByText } = render(<StarWarsCharacters />);
  const prevButton = getByText(/Previous/i);

  mockGetData.mockResolvedValue(initialData);

  await wait(() => fireEvent.click(prevButton));
  await wait(() => expect(getByText("Luke Skywalker")));
});

test("next button renders new data", async () => {
  // AAA Arrange, Act, Assert
  mockGetData.mockResolvedValue(initialData);

  const { getByText } = render(<StarWarsCharacters />);
  const nextButton = getByText(/Next/i);

  mockGetData.mockResolvedValue(mockData);

  await wait(() => fireEvent.click(nextButton));
  await wait(() => expect(getByText("Anakin Skywalker")));
});
