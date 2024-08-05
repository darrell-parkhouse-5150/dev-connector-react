import  { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';
/**
 * Renders the main application component with routing functionality.
 * Utilizes React Router to define routes for Login, Register, Dashboard, Alert, and individual Posts.
 * PrivateRoute component is used to protect the route for displaying a specific Post.
 */
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route path="dashboard" component={Dashboard} />
                <Route path="alert" component={Alert} />
                <Route path="posts/:id" element={<PrivateRoute></PrivateRoute>} component={Post}></Route>
            </Routes>
        </Router>
    )
}