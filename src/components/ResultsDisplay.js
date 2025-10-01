import React, { useState } from 'react';

const ResultsDisplay = ({ results, onReset }) => {
    const [showDetails, setShowDetails] = useState(false);

    if (!results) return null;

    const { summary, results: messageResults, errors } = results;
    const successRate = summary.successRate;
    const isSuccess = summary.successful === summary.totalAttempts;
    const hasErrors = errors && errors.length > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                    Send Results
                </h3>
                <button
                    onClick={onReset}
                    className="btn-secondary"
                >
                    Send New Messages
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Total Attempts</p>
                            <p className="text-2xl font-semibold text-gray-900">{summary.totalAttempts}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Successful</p>
                            <p className="text-2xl font-semibold text-success-600">{summary.successful}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-error-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Failed</p>
                            <p className="text-2xl font-semibold text-error-600">{summary.failed}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${successRate >= 90 ? 'bg-success-100' : successRate >= 70 ? 'bg-yellow-100' : 'bg-error-100'
                                }`}>
                                <svg className={`w-4 h-4 ${successRate >= 90 ? 'text-success-600' : successRate >= 70 ? 'text-yellow-600' : 'text-error-600'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Success Rate</p>
                            <p className={`text-2xl font-semibold ${successRate >= 90 ? 'text-success-600' : successRate >= 70 ? 'text-yellow-600' : 'text-error-600'
                                }`}>{successRate}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Message */}
            <div className={`rounded-lg p-4 ${isSuccess
                    ? 'bg-success-50 border border-success-200'
                    : hasErrors
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-error-50 border border-error-200'
                }`}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {isSuccess ? (
                            <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : hasErrors ? (
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-error-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    <div className="ml-3">
                        <h3 className={`text-sm font-medium ${isSuccess ? 'text-success-800' : hasErrors ? 'text-yellow-800' : 'text-error-800'
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
                        <div className="mt-4 space-y-4">
                            {/* Successful Messages */}
                            {messageResults.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                                        Successful Messages ({messageResults.length})
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            #
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Message ID
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Timestamp
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {messageResults.map((result, index) => (
                                                        <tr key={index}>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                {result.attempt}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                                {result.messageId}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(result.timestamp).toLocaleString()}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                                                                    Success
                                                                </span>
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
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                                        Failed Messages ({errors.length})
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            #
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Error
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Timestamp
                                                        </th>
                                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {errors.map((error, index) => (
                                                        <tr key={index}>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                {error.attempt}
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-gray-500">
                                                                {error.error}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(error.timestamp).toLocaleString()}
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                                                                    Failed
                                                                </span>
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
