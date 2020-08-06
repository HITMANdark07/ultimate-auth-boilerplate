import React, { useState } from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from "./helpers";
import Google from './Google';
import Facebook from './Facebook';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email:'shekharkumar235838@gmail.com',
        password:'pass123',
        buttonText:'Submit'
    });

    const { email, password, buttonText} = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({...values, [name]:event.target.value})
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role==='admin' ? history.push('/admin') : history.push('/private')
        })
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText:'Submitting'});
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
        .then((response) => {
            // console.log('SIGNUP SUCESS', response);
            // save the response (user, token) localStorage/cookie
            authenticate(response, () => {
                setValues({...values, email:'', password:'', buttonText:'Submitted'})
                toast.success(`Hey ${response.data.user.name}, Welcome Back!`);
                isAuth() && isAuth().role==='admin' ? history.push('/admin') : history.push('/private')
            })
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
                    <label className="text-muted">Email</label>
                    <input className="form-control" value={email} type="email" onChange={handleChange('email')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input className="form-control" value={password} type="password" onChange={handleChange('password')} />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
                    <Link to="/auth/forgot/password">
                        <button className="btn btn-outline-success ml-5" >Forgot password</button>
                    </Link>
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            <h1 className="p-5 text-center">SIGNIN</h1>
            <Google informParent={informParent} />
            <Facebook informParent={informParent} />
            {signupForm()}
            </div>
        </Layout>
    );
};

export default withRouter(Signin);