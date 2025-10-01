import React from 'react';

const Header = ({ mockMode }) => {
    return (
        <header className="bg-white/80 backdrop-blur border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/WhatsBlaster" alt="WhatsBlaster" className="w-16 h-16 rounded-lg" />
                        <div>
                            <h1 className="text-2xl font-extrabold text-charcoal-900">WhatsBlaster</h1>
                            <p className="text-xs text-charcoal-500 -mt-1">Send WhatsApp messages at scale</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {mockMode && (
                            <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">Mock Mode</span>
                        )}

                        <div className="text-sm text-charcoal-500">
                            Powered by Green-API
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
