import { render, screen } from "@testing-library/react";
import ActionsForReview from "../components/ActionsForReview";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => {
      return {
        isLoading: false,
        user: { sub: "foobar" },
        isAuthenticated: true,
        loginWithRedirect: jest.fn(),
      };
    },
  }));

  jest.mock("../AuthTokenContext", () => ({
    useAuthToken: () => {
      return { accessToken: "123" };
    },
  }));

  fetch.mockResponse(
    JSON.stringify([
      { authorId: 5,
        comment: "Some points",
        id: 5,
        spotId: 4,
    }])
  );

  test("renders todos list", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ActionsForReview />
      </MemoryRouter>
    );

   const todoItem = await screen.findByText("Some points");

   expect(todoItem).toBeInTheDocument();


  })