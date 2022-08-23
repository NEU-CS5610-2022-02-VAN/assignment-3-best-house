import { render, screen } from "@testing-library/react";
import GetDetails from "../components/GetDetails";
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
      { authorId: 3,
        comment: "Awesome!",
        id: 1,
        spotId: 2
    }])
  );

  test("renders todos list", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <GetDetails />
      </MemoryRouter>
    );

   const todoItem = await screen.findByText("Awesome!");

   expect(todoItem).toBeInTheDocument();


  })