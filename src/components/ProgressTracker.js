import React from 'react';

const ProgressTracker = ({ current, total, isSending }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    const remaining = total - current;

    return (
        <div className="progress-container" role="status" aria-live="polite">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sending Messages
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                        {current} of {total}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {/* Progress Details */}
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                    {isSending ? (
                        <>
                            <div className="loading-spinner text-primary-600"></div>
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Complete</span>
                        </>
                    )}
                </span>
                <span className="font-semibold text-gray-700">
                    {percentage.toFixed(1)}% complete
                </span>
            </div>

            {/* Current Status */}
            {isSending && (
                <div className="progress-status">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-blue-800">
                                Sending message {current} of {total}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                {remaining > 0 ? `${remaining} message${remaining !== 1 ? 's' : ''} remaining` : 'Finalizing...'}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-blue-500 font-mono">
                                {Math.round(percentage)}%
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Estimated Time */}
            {isSending && remaining > 0 && (
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Please wait while messages are being sent...
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressTracker;
