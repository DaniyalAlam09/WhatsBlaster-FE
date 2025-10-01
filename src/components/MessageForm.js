import React, { useState, useEffect } from 'react';

const MessageForm = ({ countries, onSubmit, isLoading, isSending }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        country: '',
        message: '',
        counter: 1,
        delay: 1000
    });

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};

        // Phone number validation
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number (e.g., +1234567890)';
        }

        // Country validation
        if (!formData.country) {
            newErrors.country = 'Please select a country';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length > 1000) {
            newErrors.message = 'Message must be less than 1000 characters';
        }

        // Counter validation
        if (!formData.counter || formData.counter < 1) {
            newErrors.counter = 'Counter must be at least 1';
        } else if (formData.counter > 100) {
            newErrors.counter = 'Counter cannot exceed 100';
        }

        // Delay validation
        if (formData.delay < 100 || formData.delay > 10000) {
            newErrors.delay = 'Delay must be between 100ms and 10s';
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid && !isSending) {
            onSubmit(formData);
        }
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters except +
        let cleaned = value.replace(/[^\d+]/g, '');

        // Ensure it starts with + if it doesn't already
        if (cleaned && !cleaned.startsWith('+')) {
            cleaned = '+' + cleaned;
        }

        return cleaned;
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData(prev => ({
            ...prev,
            phoneNumber: formatted
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="label">
                        Phone Number *
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="+1234567890"
                        className={`input-field ${errors.phoneNumber ? 'input-error' : ''}`}
                        disabled={isSending}
                    />
                    {errors.phoneNumber && (
                        <p className="error-text">{errors.phoneNumber}</p>
                    )}
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className="label">
                        Country *
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`input-field ${errors.country ? 'input-error' : ''}`}
                        disabled={isSending}
                    >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                            <option key={country.code} value={country.code}>
                                {country.name} ({country.dialCode})
                            </option>
                        ))}
                    </select>
                    {errors.country && (
                        <p className="error-text">{errors.country}</p>
                    )}
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="label">
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here..."
                    rows={4}
                    className={`input-field ${errors.message ? 'input-error' : ''}`}
                    disabled={isSending}
                />
                <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                        <p className="error-text">{errors.message}</p>
                    ) : (
                        <p className="text-sm text-gray-500">
                            {formData.message.length}/1000 characters
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Counter */}
                <div>
                    <label htmlFor="counter" className="label">
                        Number of Messages *
                    </label>
                    <input
                        type="number"
                        id="counter"
                        name="counter"
                        value={formData.counter}
                        onChange={handleInputChange}
                        min="1"
                        max="100"
                        className={`input-field ${errors.counter ? 'input-error' : ''}`}
                        disabled={isSending}
                    />
                    {errors.counter && (
                        <p className="error-text">{errors.counter}</p>
                    )}
                </div>

                {/* Delay */}
                <div>
                    <label htmlFor="delay" className="label">
                        Delay Between Messages (ms)
                    </label>
                    <input
                        type="number"
                        id="delay"
                        name="delay"
                        value={formData.delay}
                        onChange={handleInputChange}
                        min="100"
                        max="10000"
                        step="100"
                        className={`input-field ${errors.delay ? 'input-error' : ''}`}
                        disabled={isSending}
                    />
                    {errors.delay && (
                        <p className="error-text">{errors.delay}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.delay}ms = {(formData.delay / 1000).toFixed(1)}s
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex items-end">
                    <button
                        type="submit"
                        disabled={!isValid || isSending}
                        className="btn-primary w-full"
                    >
                        {isSending ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending...</span>
                            </div>
                        ) : (
                            'Send Messages'
                        )}
                    </button>
                </div>
            </div>

            {/* Form Summary */}
            {isValid && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Ready to Send</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                        <p><strong>Country:</strong> {countries.find(c => c.code === formData.country)?.name || 'Unknown'}</p>
                        <p><strong>Messages:</strong> {formData.counter} time{formData.counter !== 1 ? 's' : ''}</p>
                        <p><strong>Delay:</strong> {formData.delay}ms between messages</p>
                        <p><strong>Total Time:</strong> ~{((formData.counter - 1) * formData.delay / 1000).toFixed(1)}s</p>
                    </div>
                </div>
            )}
        </form>
    );
};

export default MessageForm;
