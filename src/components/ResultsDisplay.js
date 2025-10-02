import React, { useState } from 'react';

const ResultsDisplay = ({ results, onReset }) => {
    const [showDetails, setShowDetails] = useState(false);

    if (!results) return null;

    const { summary, results: messageResults, errors } = results;
    const successRate = summary.successRate;
    const isSuccess = summary.successful === summary.totalAttempts;
    const hasErrors = errors && errors.length > 0;

    return (
        <div className="results-container">
            {/* Header */}
            <div className="results-header">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Send Results
                </h3>
                <button
                    onClick={onReset}
                    className="btn-secondary flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Send New Messages
                </button>
            </div>

            {/* Summary Cards */}
            <div className="results-cards">
                <div className="results-card">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Attempts</p>
                            <p className="text-2xl font-bold text-gray-900">{summary.totalAttempts}</p>
                        </div>
                    </div>
                </div>

                <div className="results-card">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-success-100 to-success-200 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Successful</p>
                            <p className="text-2xl font-bold text-success-600">{summary.successful}</p>
                        </div>
                    </div>
                </div>

                <div className="results-card">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-error-100 to-error-200 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Failed</p>
                            <p className="text-2xl font-bold text-error-600">{summary.failed}</p>
                        </div>
                    </div>
                </div>

                <div className="results-card">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${successRate >= 90 ? 'bg-gradient-to-br from-success-100 to-success-200' : successRate >= 70 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 'bg-gradient-to-br from-error-100 to-error-200'
                                }`}>
                                <svg className={`w-5 h-5 ${successRate >= 90 ? 'text-success-600' : successRate >= 70 ? 'text-yellow-600' : 'text-error-600'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Success Rate</p>
                            <p className={`text-2xl font-bold ${successRate >= 90 ? 'text-success-600' : successRate >= 70 ? 'text-yellow-600' : 'text-error-600'
                                }`}>{successRate}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Message */}
            <div className={`results-status ${isSuccess
                ? 'bg-gradient-to-r from-success-50 to-success-100 border border-success-200'
                : hasErrors
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200'
                    : 'bg-gradient-to-r from-error-50 to-error-100 border border-error-200'
                }`}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {isSuccess ? (
                            <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        ) : hasErrors ? (
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-error-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="ml-4">
                        <h3 className={`text-lg font-semibold ${isSuccess ? 'text-success-800' : hasErrors ? 'text-yellow-800' : 'text-error-800'
                            }`}>
                            {isSuccess
                                ? 'All messages sent successfully!'
                                : hasErrors
                                    ? 'Some messages failed to send'
                                    : 'Failed to send messages'
                            }
                        </h3>
                        <p className={`text-sm mt-1 ${isSuccess ? 'text-success-700' : hasErrors ? 'text-yellow-700' : 'text-error-700'
                            }`}>
                            {isSuccess
                                ? `Successfully sent ${summary.successful} message${summary.successful !== 1 ? 's' : ''} to the recipient.`
                                : hasErrors
                                    ? `${summary.successful} out of ${summary.totalAttempts} messages were sent successfully. ${summary.failed} failed.`
                                    : 'No messages were sent successfully. Please check your configuration and try again.'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Results Toggle */}
            {(messageResults.length > 0 || hasErrors) && (
                <div>
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex items-center space-x-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                        <span>{showDetails ? 'Hide' : 'Show'} Detailed Results</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {showDetails && (
                        <div className="results-details">
                            {/* Successful Messages */}
                            {messageResults.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Successful Messages ({messageResults.length})
                                    </h4>
                                    <div className="results-table-container">
                                        <div className="overflow-x-auto">
                                            <table className="table-modern">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Message ID</th>
                                                        <th>Timestamp</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {messageResults.map((result, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="font-medium">{result.attempt}</td>
                                                            <td className="font-mono text-gray-800 bg-gray-50 px-2 py-1 rounded text-xs">{result.messageId}</td>
                                                            <td className="text-gray-600">{new Date(result.timestamp).toLocaleString()}</td>
                                                            <td>
                                                                <span className="badge badge-success">Success</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Failed Messages */}
                            {hasErrors && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Failed Messages ({errors.length})
                                    </h4>
                                    <div className="results-table-container">
                                        <div className="overflow-x-auto">
                                            <table className="table-modern">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Error</th>
                                                        <th>Timestamp</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {errors.map((error, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="font-medium">{error.attempt}</td>
                                                            <td className="text-gray-700 max-w-xs truncate" title={error.error}>{error.error}</td>
                                                            <td className="text-gray-600">{new Date(error.timestamp).toLocaleString()}</td>
                                                            <td>
                                                                <span className="badge badge-error">Failed</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultsDisplay;
