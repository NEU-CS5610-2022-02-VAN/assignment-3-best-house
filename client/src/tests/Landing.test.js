import { render, screen } from "@testing-library/react";
// add new import 
import Landing from "../components/Landing";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

let mockIsAuthenticated = false;
const mockLoginWithRedirect = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => {
      return {
        isLoading: false,
        user: { sub: "foobar" },
        isAuthenticated: mockIsAuthenticated,
        loginWithRedirect: mockLoginWithRedirect,
      };
    },
  }));

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => {
      return mockUseNavigate;
    },
  }));

  test("renders Landing copy and Login Button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });


  test("login button calls loginWithRedirect", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Landing />
      </MemoryRouter>
    );
  
    const loginButton = screen.getByText("Login");
    userEvent.click(loginButton);
  
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });

  test("renders Enter App button when user is authenticated", () => {
    mockIsAuthenticated = true;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Landing />
      </MemoryRouter>
    );
  
    expect(screen.getByText("Enter App")).toBeInTheDocument();
  });

  test("enter App button navigates to /app", () => {
    mockIsAuthenticated = true;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Landing />
      </MemoryRouter>
    );
  
    const enterAppButton = screen.getByText("Enter App");
    userEvent.click(enterAppButton);
    expect(mockUseNavigate).toHaveBeenCalledWith("/app");
  });