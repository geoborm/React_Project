import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ flashMessage, logUserIn }) {
    
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`); 

        let res = await fetch('https://kekambas-blog-api.onrender.com/api/token',{
            headers: myHeaders,
            method: 'POST'
        });

        let data = await res.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            console.log(data);
            let token = data.token;
            let expiration = data.token_exp;

            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration)

            logUserIn(true);

            flashMessage('You have succesfully logged in', 'success');
            navigate('/'); 
        };

    };
    return (
        <div>
            <div>
                <h3 className="text-center">Log In Here!</h3>
                <form action="" onSubmit={handleLogin}>
                    <div className="form-group">
                        <input type="text" name="username" className="form-control my-3" placeholder="Enter Username"></input>
                        <input type="password" name="password" className="form-control my-3" placeholder="Enter Password"></input>
                        <input type="submit" value="Log In" className="btn btn-info w-100"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}
