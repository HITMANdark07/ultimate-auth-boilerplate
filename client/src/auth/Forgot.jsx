import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { isAuth } from "./helpers";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = ({history}) => {
    const [values, setValues] = useState({
        email:'',
        buttonText:'Request'
    });

    const { email, buttonText} = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({...values, [name]:event.target.value})
    }

    const forgotPassword = event => {
        event.preventDefault();
        setValues({...values, buttonText:'Requesting'});
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        })
        .then((response) => {
            // console.log('SIGNUP SUCESS', response);
            // save the response (user, token) localStorage/cookie
            toast.success(response.data.message);
            setValues({...values,email:'',buttonText:'Submitted'})
        }).catch(error => {
            console.log('FORGOT PASSWORD ERROR', error.response.data);
            setValues({...values, buttonText:'Request'});
            toast.error(error.response.data.error);
        })
    }

    const passwordForgotForm = () => {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input className="form-control" value={email} type="email" onChange={handleChange('email')} />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={forgotPassword}>{buttonText}</button>
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            <h1 className="p-5 text-center">FORGOT PASSWORD</h1>
            {passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default Forgot;