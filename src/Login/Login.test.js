import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from '../_main/context';
import { BrowserRouter } from 'react-router-dom';
import Login from '../login/index';
import { setUser } from '../login/action';

jest.mock('../login/action', () => ({
  setUser: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <Provider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  test('renders login form correctly', () => {
    renderComponent();

    expect(screen.getByText(/login_title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/login_empno/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/login_password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login_btn/i })).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty', async () => {
    renderComponent();

    const loginButton = screen.getByRole('button', { name: /login_btn/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/empty login name/i)).toBeInTheDocument();
      expect(screen.getByText(/empty password/i)).toBeInTheDocument();
    });
  });

  test('displays error message on incorrect login', async () => {
    setUser.mockResolvedValue({ isSuccess: false });

    renderComponent();

    const usernameField = screen.getByLabelText(/login_empno/i);
    const passwordField = screen.getByLabelText(/login_password/i);
    const loginButton = screen.getByRole('button', { name: /login_btn/i });

    fireEvent.change(usernameField, { target: { value: 'wrongUser' } });
    fireEvent.change(passwordField, { target: { value: 'wrongPass' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText(/sorry, unrecognized user name or password/i)
      ).toBeInTheDocument();
    });
  });

  test('redirects to dashboard on successful login', async () => {
    setUser.mockResolvedValue({ isSuccess: true });

    renderComponent();

    const usernameField = screen.getByLabelText(/login_empno/i);
    const passwordField = screen.getByLabelText(/login_password/i);
    const loginButton = screen.getByRole('button', { name: /login_btn/i });

    fireEvent.change(usernameField, { target: { value: 'validUser' } });
    fireEvent.change(passwordField, { target: { value: 'ValidPass123!' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  test('toggles password visibility when visibility icon is clicked', () => {
    renderComponent();

    const passwordField = screen.getByLabelText(/login_password/i);
    const visibilityButton = screen.getByLabelText(/toggle password visibility/i);

    // Ensure password is hidden initially
    expect(passwordField.type).toBe('password');

    // Click to show password
    fireEvent.click(visibilityButton);
    expect(passwordField.type).toBe('text');

    // Click again to hide password
    fireEvent.click(visibilityButton);
    expect(passwordField.type).toBe('password');
  });

  test('navigates to register page when register link is clicked', () => {
    renderComponent();

    const registerButton = screen.getByText(/register/i);
    fireEvent.click(registerButton);

    expect(window.location.pathname).toBe('/register');
  });
});
