import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import jwt from 'jsonwebtoken';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { isAuth } from "./helpers";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset = ({match, history}) => {
    const [values, setValues] = useState({
        name:'',
        resetPasswordLink:'',
        newPassword:'',
        buttonText:'Submit'
    });
    useEffect(() => {
        let token=match.params.token;
        let { name } = jwt.decode(token);
        if(token){
            setValues({...values, name, resetPasswordLink:token})
        }
        // eslint-disable-next-line
    },[])

    const { name,resetPasswordLink, newPassword, buttonText} = values;

    const handleChange = event => {
        // console.log(event.target.value);
        setValues({...values, newPassword:event.target.value})
    }

    const forgotPassword = event => {
        event.preventDefault();
        setValues({...values, buttonText:'Submitting...'});
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink}
        })
        .then((response) => {
            // console.log('SIGNUP SUCESS', response);
            // save the response (user, token) localStorage/cookie
            toast.success(response.data.message);
            setValues({...values,email:'',buttonText:'Submitted'})
        }).catch(error => {
            console.log('FORGOT PASSWORD ERROR', error.response.data);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const passwordResetForm = () => {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">New password</label>
                    <input className="form-control" value={newPassword} type="password" onChange={handleChange} placeholder="new Password" required />
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
            <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
            {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default Reset;