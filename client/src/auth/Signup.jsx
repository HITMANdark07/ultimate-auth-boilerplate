import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth } from "./helpers";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [values, setValues] = useState({
        name:'shekhar',
        email:'shekhar@gmail.com',
        password:'pass123',
        buttonText:'Submit'
    });

    const {name, email, password, buttonText} = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({...values, [name]:event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText:'Submitting'});
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        })
        .then((response) => {
            console.log('SIGNUP SUCESS', response);
            setValues({...values, name:'', email:'', password:'', buttonText:'Submitted'})
            toast.success(response.data.message);
        }).catch(error => {
            console.log('SIGNUP ERROR', error.response.data);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const signupForm = () => {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input className="form-control" value={name} type="text" onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input className="form-control" value={email} type="email" onChange={handleChange('email')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input className="form-control" value={password} type="password" onChange={handleChange('password')} />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Redirect to="/" />: null}
            <h1 className="p-5 text-center">SIGNUP</h1>
            {signupForm()}
            </div>
        </Layout>
    );
};

export default Signup;