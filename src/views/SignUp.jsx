import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp({ flashMessage }) {
    
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass){
            flashMessage('Passwords do not match!', 'warning')
        } else{
            console.log('Passwords match!')

            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password
            })

            fetch('https://kekambas-blog-api.onrender.com/api/users', {
                method:'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.eror){
                        flashMessage(data.error, 'danger')
                    } else{
                        flashMessage(`${data.username} has been created.`, 'success');
                        navigate('/');
                    }
                })
        }
    }
    
    return (
        <div>
            <h3 className="text-center">Sign Up Here!</h3>
            <form action="" onSubmit={handleSignUp}>
                <div className="form-group">
                    <input type="text" name="username" className="form-control my-3" placeholder="Enter Username"></input>
                    <input type="text" name="email" className="form-control my-3" placeholder="Enter Email"></input>
                    <input type="password" name="password" className="form-control my-3" placeholder="Enter Password"></input>
                    <input type="password" name="confirmPass" className="form-control my-3" placeholder="Confirm Password"></input>
                    <input type="submit" value="Sign Up" className="btn btn-info w-100"></input>
                </div>
            </form>
        </div>
    )
}
