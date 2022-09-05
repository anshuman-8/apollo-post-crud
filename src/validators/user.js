import * as yup from 'yup';

const username=yup
    .string()
    .required('Username is required')
    .min(5,'Username must be at least 5 characters')
    .max(20,'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9]+$/,'Username must be alphanumeric');

const password=yup
    .string()
    .required('Password is required')
    .min(5,'Password must be at least 5 characters')
    .max(20,'Password must be at most 20 characters')
    .matches(/^[a-zA-Z0-9]+$/,'Password must be alphanumeric');

const email=yup
    .string()
    .email('Email must be a valid email');

const firstName=yup
    .string()
    .required('First name is required')
    .min(2,'First name must be at least 2 characters')
    .max(20,'First name must be at most 20 characters')
    .matches(/^[a-zA-Z]+$/,'First name must be alphabetic');

const lastName=yup
    .string()
    .min(2,'Last name must be at least 2 characters')
    .max(20,'Last name must be at most 20 characters')
    .matches(/^[a-zA-Z]+$/,'Last name must be alphabetic');

const avatarImage=yup
    .string()
    .url('Avatar image must be a valid url');

export const registerNewUserVadidator=yup.object().shape({
    username,
    email,
    first_Name:firstName,
    last_Name:lastName,
    password,
    avatarImage
});

export const loginUserValidator=yup.object().shape({
    username,
    password
});