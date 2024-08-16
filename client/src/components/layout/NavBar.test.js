import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@test-library/userEvent'
import Navbar from './Navbar';
describe('Navbar Component', () => {
    it ('should render guest links when no auth prop is provided', () => {
        const { getByText } = render(<Navbar />);
  
        expect(getByText('Developers')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
    });

    it ('should render auth links when use has been authenticated', _ => {
        const mockLogout = jest.fn();
        const auth = { isAuthenticated: true };
        const { getByText } = render(<Navbar auth={auth} logout={mockLogout} />);
    
        expect(getByText('Developers')).toBeInTheDocument();
        expect(getByText('Posts')).toBeInTheDocument();
        expect(getByText('Dashboard')).toBeInTheDocument();
        expect(getByText('Logout')).toBeInTheDocument();
    });

    describe('Navbar Component', () => {
        it ('renders Navbar component with guest lines when not authenticated', _ => {
            const { getByText } = render(<Navbar auth={{ isAuthenticated: false}} />);
            expect(getByText('Developers')).toBeInTheDocument();
        })
    })

    describe('Navbar Component', () => {
        test ('render Nav bar component with guest links when not authenticated', () => {
            render(<Navbar auth={{ isAuthenticated: false}} />)

            expect(screen.getByText('Developers')).toBeInTheDocument();
            expect(screen.getByText('Register')).toBeInTheDocument()
            expect(screen.getByText('Login')).toBeInTheDocument()
            
        })

        test ('renders navBar component with auth links when authenticated', () => {
            render(<Navbar auth={{ isAuthenticated: true}} />)

            expect(screen.getByText('Developers')).toBeInTheDocument();
            expect(screen.getByText('Posts')).toBeInTheDocument()
            expect(screen.getByText('Dashboard')).toBeInTheDocument()
            expect(screen.getByText('Logout')).toBeInTheDocument();
        })
        test('clicking on the logout link calls the logout function', () => {
            const logoutMock = jest.fn()
            render(<Navbar auth={{ isAuthenticated: true}} logout={logoutMock} />)

            const logoutLink = screen.getByText('Logout');
            userEvent.click(logoutLink)
            expect(logoutMock).toHaveBeenCalledTimes(1);
        })
    })
})

