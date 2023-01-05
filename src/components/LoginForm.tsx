import React, { useState } from 'react';
import AddToList from "./AddToList";

interface LoginFormProps{
    onSubmit: (username: string, password: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit}) => {
    const[username, setUsername] = React.useState('');
    const[password, setPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        onSubmit(username,password);
    }

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <button type="submit">login</button>
            </form>
        </div>
    );
}

export default LoginForm