import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import MessageForm from './components/MessageForm';
import ProgressTracker from './components/ProgressTracker';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';
import Login from './components/Login';
import { sendBulkMessages, getCountries } from './services/api';

function App() {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [results, setResults] = useState(null);
    const [mockMode, setMockMode] = useState(false);
    const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('wb_auth') === 'true');

    useEffect(() => {
        // Load countries on component mount
        loadCountries();
        checkMockMode();
    }, []);

    const loadCountries = async () => {
        try {
            const response = await getCountries();
            if (response.success) {
                setCountries(response.countries);
            }
        } catch (error) {
            console.error('Failed to load countries:', error);
            toast.error('Failed to load countries list');
        }
    };

    const checkMockMode = async () => {
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            setMockMode(data.mockMode);
        } catch (error) {
            console.error('Failed to check server status:', error);
        }
    };

    const handleSendMessages = async (formData) => {
        setIsSending(true);
        setProgress({ current: 0, total: formData.counter });
        setResults(null);

        try {
            const response = await sendBulkMessages(formData, (current, total) => {
                setProgress({ current, total });
            });

            if (response.success) {
                setResults(response);
                toast.success(`Successfully sent ${response.summary.successful} out of ${response.summary.totalAttempts} messages`);
            } else {
                toast.error(response.error || 'Failed to send messages');
            }
        } catch (error) {
            console.error('Error sending messages:', error);
            toast.error(error.message || 'Failed to send messages');
        } finally {
            setIsSending(false);
            setProgress({ current: 0, total: 0 });
        }
    };

    const handleReset = () => {
        setResults(null);
        setProgress({ current: 0, total: 0 });
    };

    if (!isAuthed) {
        return <Login onSuccess={() => setIsAuthed(true)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />

            <Header mockMode={mockMode} />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            WhatsBlaster
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Send bulk WhatsApp messages using Green-API. Enter the phone number,
                            select the country, write your message, and specify how many times to send it.
                        </p>

                        {mockMode && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800">
                                            Mock Mode Active
                                        </h3>
                                        <p className="text-sm text-yellow-700 mt-1">
                                            No real messages will be sent. This is for testing purposes only.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <MessageForm
                            countries={countries}
                            onSubmit={handleSendMessages}
                            isLoading={isLoading}
                            isSending={isSending}
                        />
                    </div>

                    {isSending && (
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <ProgressTracker
                                current={progress.current}
                                total={progress.total}
                                isSending={isSending}
                            />
                        </div>
                    )}

                    {results && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <ResultsDisplay
                                results={results}
                                onReset={handleReset}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
