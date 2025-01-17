"use client";

import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../provider/toastProvider';

const FormContact = () => {
    const [formData, setFormData] = useState({
        type: 'bug',
        email: '',
        message: '',
    });

    const [baseUrl, setBaseUrl] = useState<string>('')
    const {show} = useContext(ToastContext);

    useEffect(()=>{
        setBaseUrl(window.location.origin)
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(formData.email !== '' && formData.message !== '' && formData.type !==''){
            try {
                const response = await fetch(`${baseUrl}/api/contact`, {  
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
    
                show('Succès', `Votre message s'est bien envoyé`, 'success')
                setFormData({ email: '', type: 'bug', message: '' });  // Reset form
            } catch (error) {
                console.error('Error sending message:', error);
                show('Erreur', `Erreur lors de l'envois de votre message`, 'error')
            }
        }else{
            show('Erreur', `Les champs ne sont pas tous remplis`, 'error')
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
                            ['email']: e.target.value,
                          }))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                    <select name="type" id="feedback-select"  onChange={(e)=>    setFormData((prev) => ({
                            ...prev,
                            ['type']: e.target.value, 
                          }))}>
                        <option value="">--Merci de renseigner une option--</option>
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
                            ['message']: e.target.value,
                          }))}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={formData.type === '' || formData.message === '' || formData.email === ''}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default FormContact;