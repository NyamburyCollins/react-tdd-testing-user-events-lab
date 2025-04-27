import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Newsletter Signup Form', () => {
  test('renders name input field', () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('type', 'text');
  });

  test('renders email input field', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'text');
  });

  test('renders interest checkboxes', () => {
    render(<App />);
    const techCheckbox = screen.getByLabelText(/technology/i);
    const designCheckbox = screen.getByLabelText(/design/i);
    const businessCheckbox = screen.getByLabelText(/business/i);
    
    expect(techCheckbox).toBeInTheDocument();
    expect(designCheckbox).toBeInTheDocument();
    expect(businessCheckbox).toBeInTheDocument();
    expect(techCheckbox).toHaveAttribute('type', 'checkbox');
  });

  test('renders submit button', () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});
describe('Form Submission', () => {
  test('displays success message after submission', () => {
    render(<App />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByLabelText(/technology/i));
    fireEvent.click(screen.getByLabelText(/business/i));
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check for success message
    const successMessage = screen.getByText(/thank you, john doe/i);
    expect(successMessage).toBeInTheDocument();
    
    // Check for email in success message
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    
    // Check for interests in success message
    expect(screen.getByText(/technology/i)).toBeInTheDocument();
    expect(screen.getByText(/business/i)).toBeInTheDocument();
    expect(screen.queryByText(/design/i)).not.toBeInTheDocument();
  });

  test('hides form after submission', () => {
    render(<App />);
    
    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check that form is no longer visible
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });
});

module.exports = {
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
};