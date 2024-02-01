import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Auth from "../authentification/Auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Mock de firebase/auth pour pouvoir contrôler son comportement dans les tests
jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn(), // Mock de la fonction getAuth
  signInWithEmailAndPassword: jest.fn(), // Mock de la fonction signInWithEmailAndPassword
}));

describe("Auth Component", () => {
  test("signIn function should be called with correct arguments on success", async () => {
    const authMock = {};

    getAuth.mockReturnValue(authMock);

    render(<Auth />);

    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByText("Se connecter"));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        authMock,
        "test@example.com",
        "password123"
      );
    });
  });

  test("handleSubmit function should handle errors correctly", async () => {
    const authMock = {
      // ... ajoutez des méthodes ou des propriétés nécessaires pour vos tests
    };

    getAuth.mockReturnValue(authMock);

    // Configurer signInWithEmailAndPassword pour renvoyer une erreur spécifique dans ce test
    signInWithEmailAndPassword.mockRejectedValueOnce({
      message: "Test Error",
    });

    render(<Auth />);

    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByText("Se connecter"));

    await waitFor(() => {
      expect(screen.getByText("Test Error")).toBeInTheDocument();
    });
  });
});
