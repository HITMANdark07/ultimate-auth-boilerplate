import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import axios from 'axios';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Private = ({history}) => {
    const [values, setValues] = useState({
        role:'',
        name:'',
        email:'',
        password:'',
        buttonText:'Submit'
    });
    const token =getCookie('token');
    const loadProfile = () => {
        axios({
            method:'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data: {name, email, password}
        })
        .then((response) => {
            console.log('PROFILE UPDATE', response);
            const {role,name, email} =response.data.user;
            setValues({...values,role,name,email})
        }).catch(error => {
            console.log('PROFILE UPDATE ERROR', error.response.data);
            if(error.response.status === 401) {
                signout(() => {
                    history.push("/");
                })
            }
        })
    }

    useEffect(() => {
        loadProfile();
    //eslint-disable-next-line
    },[]);

    const {role, name, email, password, buttonText} = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({...values, [name]:event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText:'Submitting'});
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers:{
                Authorization: `Bearer ${token}`
            },
            data: {name, password}
        })
        .then((response) => {
            console.log('PRIVATE PROFILE UPDATE SUCESS', response);
            updateUser(response, () => {
                setValues({...values,password:'', buttonText:'Submitted'})
                toast.success('Profile updated successfully');
            })
        }).catch(error => {
            console.log('PRIVATE PROFILE UPDATE FAIL', error.response.data);
            setValues({...values, buttonText:'Submit'});
            toast.error(error.response.data.error);
        })
    }

    const updateForm = () => {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">Role</label>
                    <input className="form-control" defaultValue={role} type="text" disabled  />
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input className="form-control" value={name} type="text" onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input className="form-control" defaultValue={email} type="email" disabled/>
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
            <h1 className="pt-5 text-center">PRIVATE</h1>
            <p className="lead text-center">Profile update</p>
            {updateForm()}
            </div>
        </Layout>
    );
};

export default Private;