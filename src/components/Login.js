import React, { useState } from 'react';

const Login = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'admin' && password === 'adminpassword123') {
            localStorage.setItem('wb_auth', 'true');
            onSuccess();
        } else {
            setError('Invalid username or password. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card scale-in">
                <div className="login-header" style={{ textAlign: 'center' }}>
                    <div className="flex justify-center mb-4">
                        <img src="/WhatsBlaster" alt="WhatsBlaster" className="header-logo" />

                    </div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your WhatsBlaster account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="form-group">
                        <label className="label" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            className={`input-field ${error ? 'input-error' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                            aria-invalid={!!error}
                            placeholder="Enter your username"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className={`input-field pr-12 ${error ? 'input-error' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                aria-invalid={!!error}
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="error-text" role="alert">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={isLoading || !username || !password}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="loading-spinner"></div>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Demo credentials: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin</span> / <span className="font-mono bg-gray-100 px-2 py-1 rounded">adminpassword123</span>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default Login;