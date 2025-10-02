import React from 'react';

const Header = ({ mockMode }) => {
    return (
        <header className="header-container">
            <div className="header-content">
                <div className="flex items-center justify-between">
                    <a href="/" className="header-brand group">
                        <img src="/WhatsBlaster" alt="WhatsBlaster" className="header-logo" />
                        <div>
                            <h1 className="header-title">WhatsBlaster</h1>
                            <p className="header-subtitle">Send WhatsApp messages at scale</p>
                        </div>
                    </a>

                    <div className="flex items-center gap-4">
                        {mockMode && (
                            <span className="badge badge-warning">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                                Mock Mode
                            </span>
                        )}

                        <div className="hidden sm:flex items-center gap-2 text-sm text-charcoal-500">
                            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span className="font-semibold text-charcoal-700">WhatsBlaster</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
