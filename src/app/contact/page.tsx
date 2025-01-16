"use client";

import React, { useState } from 'react';

const FormContact = () => {
    const [formData, setFormData] = useState({
        type: 'bug',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    // const handleChange = (e: React.FormEvent) => {
    //     const { name, value  } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        setStatus('sending');

        try {
            const response = await fetch('http://localhost:3000/api/admin-dashboard/contact', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            setFormData({ email: '', type: 'bug', message: '' });  // Reset form
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e)=>    setFormData((prev) => ({
                            ...prev,
                            ['email']: e.target.value, // Mise à jour dynamique de la clé correspondante
                          }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                    <select name="type" id="feedback-select"  onChange={(e)=>    setFormData((prev) => ({
                            ...prev,
                            ['type']: e.target.value, 
                          }))}>
                        <option value="">--Please choose an option--</option>
                        <option value="bug">Bug</option>
                        <option value="suggestion">Suggestion</option>
                    </select>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e)=>    setFormData((prev) => ({
                            ...prev,
                            ['message']: e.target.value, // Mise à jour dynamique de la clé correspondante
                          }))}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                    <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 text-sm mt-2">Failed to send message. Please try again.</p>
                )}
            </form>
        </div>
    );
};

export default FormContact;