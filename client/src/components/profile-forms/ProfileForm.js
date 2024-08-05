import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import propType from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    gethubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
};

const ProfileForm = ({ profile: { profile, loading }, createProfile, getCurrentProfile }) => {
    const [formData, setFormData] = useState(initialState);
    const createProfile = useMatch("/create-profile");
    const [displaySocalInputs, toggleSocialInputs] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!profile) getCurrentProfile();

        if (!loading && profile) {
            profileData = { ...initialState };

            for (const key in profile) {
                if (key in profile) profileData[key] = profile[key];
            }

            for (const key in profile.social) {
                if (key in profileData) profileData[key] = profile.social[key];
            }

            if (Array.isArray(profileData.skills)) profileData.skills = profiledata.skills.join(", ");

            setFormData(profileData);
        }
    }, [loading, getCurrentProfile, profile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        gethubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        const editing = profile ? true : false;
        e.preventDefault();

        createProfile(formData, editing).then(() => {
            if (!editing) navigate('/dashboard')
        });
    };

    return (
        <section className="container">
            <h1 className="laerge text-primary">
                { createProfile ? 'Create your profile' : 'Edit your profile'}
            </h1>
            <p className="load">
                <i className="fas fa-use" />
                {
                    createProfile 
                        ? "Let's get some information to make your profile"
                        : "Add some changed to your profile"
                }
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange}>
                        <option>* Select professional status</option>
                        <option value="dev">developer</option>
                        <option value="jr dev">Jr Developer</option>
                        <option value="sr dev">Sr Developer</option>
                        <option value="manager">Manager</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="intern">Intern</option>
                        <option value="other">other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <label for="company"></label>
                    <input type="text" placeholder="" name="company" value={company} onChange={onChange} id="company"/>
        
                    <small className="form-text">could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <label for="text"></label>
                    <input type="text" placeholder="website" name="website" value={website} onChange={onChange} id="text"/>
                    <small className="form-text"></small>
                </div>
        
            </form>
        </section>
    )
};

ProfileForm.propTypes={
    createProfile: propType.func.isRequired,
    getCurrentProfile: propType.func.isRequired,
    profile: propType.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(ProfileForm);