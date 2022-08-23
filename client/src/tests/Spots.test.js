import { render, screen } from "@testing-library/react";
import Spots from "../components/Spots";
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

  jest.mock("../hooks/useSpots", () => {
    return jest.fn(() => [
      [
      { id: 1, name: "city 1", intros: "intro1" },
      { id: 2, name: "city 2", intros: "intro2" },
      { id: 3, name: "city 3", intros: "intro3" },
      ],
      () => {},
    ]);
  });

  test("renders todos list", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Spots />
      </MemoryRouter>
    );

   const todoItem = await screen.findByText("city 1");
//    const todoItem2 = await screen.findByText("item 2");

   expect(todoItem).toBeInTheDocument();
//    expect(todoItem2).toBeInTheDocument();


  })