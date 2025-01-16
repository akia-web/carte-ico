"use client";
import { useState } from "react";

export default function AdminConfigForm() {
  // Gestion des états pour les champs du formulaire
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données envoyées :", { textInput, numberInput });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Configuration Admin</h1>

        {/* Champ texte */}
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

        {/* Champ numérique */}
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

        {/* Bouton envoyer */}
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