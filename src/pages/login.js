import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const showAlert = () => {
        window.alert('Invalid credentials!');
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            const { token } = response.data;
            Cookies.set('token', token, { secure: true, sameSite: 'Lax' });
            router.push('/dashboard');
        } catch (error) {
            showAlert()
            console.error('Login failed:', error);
        }
    }

    return (
        <div>
            <h1 className='primary-heading text-center'>Welcome to Globe Explorer</h1>
            <h1 className='secondary-heading text-center'>Login here</h1>

            <form className=' flex flex-col items-center space-y-3 max-w-[300px] mx-auto' onSubmit={handleLogin}>
                <div>
                    <label className='text-lg font-semibold mr-3' htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label className='text-lg font-semibold mr-3' htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className='pink-button w-[70%]'>Login</button>
            </form>
        </div>
    );
}
