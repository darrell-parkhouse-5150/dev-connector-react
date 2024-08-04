import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
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
        setFormData({ ...FormData, [e.target.name]: e.target.value})
    }
};
