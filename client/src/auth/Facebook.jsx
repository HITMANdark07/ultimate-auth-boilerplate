import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Facebook = ({informParent = f => f}) => {

    const responseFacebook = (response) => {
        console.log(response);
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/facebook-login`,
            data:{userId: response.userID, accessToken: response.accessToken}
        }).then(response => {
            console.log("FACEBOOK SIGNUP SUCCESS", response);
            // inforn parent component
            informParent(response);
        }).catch(error => {
            console.log('FACEBOOK SIGNIN ERROR',error.response);
        });
    };
    return(
        <div className="pb-3">
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button className="btn btn-primary btn-lg btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                     <i className="fa fa-facebook pr-2"></i>   LOGIN WITH FACEBOOK
                    </button>
                )}
            />
        </div>
    );
};

export default Facebook;