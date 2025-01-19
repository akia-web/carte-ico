'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../provider/toast.provider';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';

type FeedbackType = 'bug' | 'suggestion';
const FormContact = () => {
  const [formData, setFormData] = useState<{ type: FeedbackType, email: string, subject: string, message: string }>({
    type: 'bug',
    email: '',
    subject: '',
    message: '',
  });
  const optionSelect: { name: 'bug' | 'suggestion' }[] = [
    { name: 'bug' },
    { name: 'suggestion' },
  ];

  const [selectedType, setSelectedType] = useState({ name: 'bug' });
  const [baseUrl, setBaseUrl] = useState<string>('');
  const { show } = useContext(ToastContext);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  });

  const setTypeSuggestion = (value: { name: string }) => {
    setFormData((prev) => ({
      ...prev,
      ['type']: value.name as FeedbackType,
    }));
    setSelectedType(value);
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.email !== '' && formData.message !== '' || formData.subject !== '') {
      try {
        const response: Response = await fetch(`${baseUrl}/api/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        show('Succès', `Votre message s'est bien envoyé`, 'success');
        setFormData({ email: '', type: 'bug', message: '', subject: '' });
        setSelectedType({ name: 'bug' })
      } catch (error) {
        console.error('Error sending message:', error);
        show('Erreur', `Erreur lors de l'envois de votre message`, 'error');
      }
    } else {
      show('Erreur', `Les champs ne sont pas tous remplis`, 'error');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-md mr-2 ml-2 mx-auto p-6 bg-white rounded-lg shadow-md">
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
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                ['email']: e.target.value,
              }))}
              required
              className="mt-1 block w-full rounded-md border p-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <Dropdown value={selectedType} onChange={(e) => setTypeSuggestion(e.value)} options={optionSelect} optionLabel="name"
                      placeholder="Selectionnez un type" className="w-full md:w-14rem border border-gray-300"/>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                ['subject']: e.target.value,
              }))}
              required
              className="mt-1 block w-full border p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <Editor value={formData.message} onTextChange={(e) => setFormData((prev) => ({
              ...prev,
              message: e.htmlValue || '',
            }))} style={{ height: '320px' }}/>
          </div>

          <button
            type="submit"
            disabled={formData.subject === '' || formData.message === '' || formData.email === ''}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>

  );
};

export default FormContact;