import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../components/Profile";
import '@testing-library/jest-dom'

let mockIsAuthenticated = false;

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      user: {
        sub: "subId",
        email: "guanxia4@msu.edu",
        email_verified: true,
      },
      isAuthenticated: mockIsAuthenticated,
      loginWithRedirect: jest.fn(),
    };
  },
}));

test("renders Profile", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Profile />
    </MemoryRouter>
  );

//   expect(screen.getByText("Name: guanxia4")).toBeInTheDocument();
  expect(screen.getByText("📧 Email: guanxia4@msu.edu")).toBeInTheDocument();
  expect(screen.getByText("🔑 Auth0Id: subId")).toBeInTheDocument();
  expect(screen.getByText("✅ Email verified: true")).toBeInTheDocument();
});