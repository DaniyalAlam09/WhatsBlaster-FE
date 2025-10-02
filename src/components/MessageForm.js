import React, { useState, useEffect, useCallback } from 'react';

// Popular countries to show at the top
const POPULAR_COUNTRIES = ['US', 'PK', 'KR', 'SG', 'IN', 'BR', 'MX', 'AR'];

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
    const [countrySearch, setCountrySearch] = useState('');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);

    // Filter countries based on search
    useEffect(() => {
        if (!countries.length) return;

        let filtered = countries;

        if (countrySearch.trim()) {
            filtered = countries.filter(country =>
                country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                country.code.toLowerCase().includes(countrySearch.toLowerCase()) ||
                country.dialCode.includes(countrySearch)
            );
        }

        // Sort: popular countries first (in their defined order), then alphabetically
        filtered.sort((a, b) => {
            const aIsPopular = POPULAR_COUNTRIES.includes(a.code);
            const bIsPopular = POPULAR_COUNTRIES.includes(b.code);

            // If both are popular, sort by their order in POPULAR_COUNTRIES array
            if (aIsPopular && bIsPopular) {
                return POPULAR_COUNTRIES.indexOf(a.code) - POPULAR_COUNTRIES.indexOf(b.code);
            }

            // If only one is popular, popular one comes first
            if (aIsPopular && !bIsPopular) return -1;
            if (!aIsPopular && bIsPopular) return 1;

            // If neither is popular, sort alphabetically
            return a.name.localeCompare(b.name);
        });

        setFilteredCountries(filtered);
    }, [countries, countrySearch]);

    const validateForm = useCallback(() => {
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
    }, [formData]);

    useEffect(() => {
        validateForm();
    }, [formData, validateForm]);

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

        // If the value starts with a country code from selected country, keep it
        const selectedCountry = getSelectedCountry();
        if (selectedCountry && cleaned.startsWith(selectedCountry.dialCode)) {
            return cleaned;
        }

        // If it starts with the country code without +, add +
        if (selectedCountry && cleaned.startsWith(selectedCountry.dialCode.replace('+', ''))) {
            return '+' + cleaned;
        }

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

    const handleCountrySelect = (countryCode) => {
        const selectedCountry = countries.find(c => c.code === countryCode);

        setFormData(prev => ({
            ...prev,
            country: countryCode,
            // Auto-fill phone number with country dial code if phone field is empty
            phoneNumber: prev.phoneNumber.trim() === '' ? selectedCountry?.dialCode || '' : prev.phoneNumber
        }));
        setShowCountryDropdown(false);
        setCountrySearch('');
    };

    const handleCountrySearchChange = (e) => {
        setCountrySearch(e.target.value);
        setShowCountryDropdown(true);
    };

    const getSelectedCountry = () => {
        return countries.find(c => c.code === formData.country);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCountryDropdown && !event.target.closest('.country-dropdown')) {
                setShowCountryDropdown(false);
                setCountrySearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCountryDropdown]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Contact Information Section */}
                <div className="form-section">
                    <h3 className="form-section-title">Contact Information</h3>
                    <div className="form-row">

                        {/* Country */}
                        <div className="form-group">
                            <label htmlFor="country" className="label">
                                Country *
                            </label>
                            <div className="relative country-dropdown">
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={countrySearch || getSelectedCountry()?.name || ''}
                                    onChange={handleCountrySearchChange}
                                    onFocus={() => setShowCountryDropdown(true)}
                                    placeholder="Search for a country..."
                                    className={`input-field pl-12 pr-12 ${errors.country ? 'input-error' : ''}`}
                                    disabled={isSending}
                                    autoComplete="off"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {/* Dropdown */}
                                {showCountryDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                                        <div className="p-2 border-b border-gray-100">
                                            <div className="text-xs font-medium text-gray-500 mb-1">
                                                {countrySearch ? 'Search Results' : 'Countries'}
                                            </div>
                                        </div>
                                        <div className="py-1">
                                            {filteredCountries.length > 0 ? (
                                                (() => {
                                                    const popularCountries = filteredCountries.filter(country => POPULAR_COUNTRIES.includes(country.code));
                                                    const otherCountries = filteredCountries.filter(country => !POPULAR_COUNTRIES.includes(country.code));

                                                    return (
                                                        <>
                                                            {/* Popular Countries Section */}
                                                            {!countrySearch && popularCountries.length > 0 && (
                                                                <>
                                                                    <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-100">
                                                                        <div className="text-xs font-semibold text-yellow-700 flex items-center gap-1">
                                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                            </svg>
                                                                            Popular Countries
                                                                        </div>
                                                                    </div>
                                                                    {popularCountries.map((country) => (
                                                                        <button
                                                                            key={country.code}
                                                                            type="button"
                                                                            onClick={() => handleCountrySelect(country.code)}
                                                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${formData.country === country.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-6 h-4 bg-gray-100 rounded-sm flex items-center justify-center text-xs font-mono">
                                                                                    {country.code}
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-medium">{country.name}</div>
                                                                                    <div className="text-sm text-gray-500">{country.dialCode}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                                                                Popular
                                                                            </div>
                                                                        </button>
                                                                    ))}
                                                                </>
                                                            )}

                                                            {/* Other Countries Section */}
                                                            {otherCountries.length > 0 && (
                                                                <>
                                                                    {!countrySearch && popularCountries.length > 0 && (
                                                                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                                                            <div className="text-xs font-semibold text-gray-600">
                                                                                All Countries
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {otherCountries.map((country) => (
                                                                        <button
                                                                            key={country.code}
                                                                            type="button"
                                                                            onClick={() => handleCountrySelect(country.code)}
                                                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${formData.country === country.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-6 h-4 bg-gray-100 rounded-sm flex items-center justify-center text-xs font-mono">
                                                                                    {country.code}
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-medium">{country.name}</div>
                                                                                    <div className="text-sm text-gray-500">{country.dialCode}</div>
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </>
                                                    );
                                                })()
                                            ) : (
                                                <div className="px-4 py-3 text-gray-500 text-center">
                                                    No countries found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.country && (
                                <p className="error-text">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.country}
                                </p>
                            )}
                        </div>


                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phoneNumber" className="label">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneChange}
                                    placeholder={getSelectedCountry()?.dialCode ? `${getSelectedCountry().dialCode}1234567890` : "+1234567890"}
                                    className={`input-field pl-12 pr-12 ${errors.phoneNumber ? 'input-error' : ''}`}
                                    disabled={isSending}
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                {getSelectedCountry() && (
                                    <div className="absolute inset-y-0 right-3 flex items-center">
                                        <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-md font-medium">
                                            {getSelectedCountry().code}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {getSelectedCountry() && (
                                <p className="help-text">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Country code {getSelectedCountry().dialCode} will be automatically added
                                </p>
                            )}
                            {errors.phoneNumber && (
                                <p className="error-text">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>


                    </div>
                </div>

                {/* Message Section */}
                <div className="form-section">
                    <h3 className="form-section-title">Message Content</h3>
                    <div className="form-group">
                        <label htmlFor="message" className="label">
                            Message *
                        </label>
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Enter your message here..."
                                rows={4}
                                className={`input-field pl-12 resize-none ${errors.message ? 'input-error' : ''}`}
                                disabled={isSending}
                            />
                            <div className="absolute top-3 left-3 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            {errors.message ? (
                                <p className="error-text">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.message}
                                </p>
                            ) : (
                                <p className="help-text">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {formData.message.length}/1000 characters
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sending Configuration Section */}
                <div className="form-section">
                    <h3 className="form-section-title">Sending Configuration</h3>
                    <div className="form-row">
                        {/* Counter */}
                        <div className="form-group">
                            <label htmlFor="counter" className="label">
                                Number of Messages *
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="counter"
                                    name="counter"
                                    value={formData.counter}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="100"
                                    className={`input-field pl-12 ${errors.counter ? 'input-error' : ''}`}
                                    disabled={isSending}
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                                    </svg>
                                </div>
                            </div>
                            {errors.counter && (
                                <p className="error-text">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.counter}
                                </p>
                            )}
                        </div>

                        {/* Delay */}
                        <div className="form-group">
                            <label htmlFor="delay" className="label">
                                Delay Between Messages (ms)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="delay"
                                    name="delay"
                                    value={formData.delay}
                                    onChange={handleInputChange}
                                    min="100"
                                    max="10000"
                                    step="100"
                                    className={`input-field pl-12 ${errors.delay ? 'input-error' : ''}`}
                                    disabled={isSending}
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.delay && (
                                <p className="error-text">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.delay}
                                </p>
                            )}
                            <p className="help-text">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formData.delay}ms = {(formData.delay / 1000).toFixed(1)}s
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={!isValid || isSending}
                        className="btn-primary flex-1"
                    >
                        {isSending ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="loading-spinner"></div>
                                <span>Sending Messages...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Send Messages</span>
                            </div>
                        )}
                    </button>
                </div>

                {/* Form Summary */}
                {isValid && (
                    <div className="form-summary">
                        <h3 className="form-summary-title">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ready to Send
                        </h3>
                        <div className="form-summary-content">
                            <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                            <p><strong>Country:</strong> {getSelectedCountry()?.name || 'Unknown'} ({getSelectedCountry()?.dialCode || ''})</p>
                            <p><strong>Messages:</strong> {formData.counter} time{formData.counter !== 1 ? 's' : ''}</p>
                            <p><strong>Delay:</strong> {formData.delay}ms between messages</p>
                            <p><strong>Total Time:</strong> ~{((formData.counter - 1) * formData.delay / 1000).toFixed(1)}s</p>
                        </div>
                    </div>
                )}
            </form>

            {/* About Me Section */}
            <div className="mt-10">
                <div className="card p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">About Me</h2>
                    <p className="text-lg italic text-gray-600 mb-6">"Send smarter, not harder."</p>

                    <div className="space-y-3 text-gray-700">
                        <p className="text-sm">
                            <span className="font-medium">Powered by</span> Daniyal
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <a
                                href="https://github.com/DaniyalAlam09"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>

                            <a
                                href="mailto:dannyalalam09@gmail.com"
                                className="text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageForm;
