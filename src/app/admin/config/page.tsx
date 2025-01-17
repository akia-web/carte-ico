"use client";
import { BASE_URL } from "@/app/config/config";
import { ToastContext } from "@/app/provider/toastProvider";
import { useContext, useState } from "react";

export default function AdminConfigForm() {
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [status, setStatus] = useState('');

   const {show} = useContext(ToastContext);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if(textInput !== '' && numberInput !== ''){
      const newconfig={
        name: textInput, 
        value: numberInput
      }
  
  
      try {
          const response = await fetch(`${BASE_URL}/api/admin-dashboard/configuration`, {  
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newconfig),
          });
  
          if (!response.ok) {
              throw new Error('Failed to send message');
          }
  
          setStatus('success');
          setTextInput("");  // Reset form1
          setNumberInput("")
  
      } catch (error) {
          console.error('Error sending message:', error);
          setStatus('error');
      }
    }

   
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Configuration Admin</h1>

        <div className="mb-4">
          <label htmlFor="textInput" className="block text-gray-700 font-medium mb-2">
            Clé
          </label>
          <input
            id="textInput"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez un texte"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numberInput" className="block text-gray-700 font-medium mb-2">
            Valeur
          </label>
          <input
            id="numberInput"
            type="number"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez un nombre"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}