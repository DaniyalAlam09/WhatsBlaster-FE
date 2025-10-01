import React from 'react';

const ProgressTracker = ({ current, total, isSending }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    const remaining = total - current;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Sending Messages
                </h3>
                <span className="text-sm text-gray-600">
                    {current} of {total}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {/* Progress Details */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                    {isSending ? 'Sending...' : 'Complete'}
                </span>
                <span>
                    {percentage.toFixed(1)}% complete
                </span>
            </div>

            {/* Current Status */}
            {isSending && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-800">
                                Sending message {current} of {total}
                            </p>
                            <p className="text-xs text-blue-600">
                                {remaining > 0 ? `${remaining} message${remaining !== 1 ? 's' : ''} remaining` : 'Finalizing...'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Estimated Time */}
            {isSending && remaining > 0 && (
                <div className="text-xs text-gray-500 text-center">
                    Please wait while messages are being sent...
                </div>
            )}
        </div>
    );
};

export default ProgressTracker;
