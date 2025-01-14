"use client";

import React from 'react';

const GameRulesPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique pour envoyer les données à la base de données
        console.log("Formulaire soumis !");
    };

    return (
        <form className="rules-container mx-auto max-w-4xl bg-white shadow-lg p-8 rounded-lg" onSubmit={handleSubmit}>
            {/* Section: But du jeu */}
            <fieldset id="game-objective" className="rules-section mb-8">
                <legend className="text-2xl font-bold text-blue-600 mb-4">But du jeu</legend>
                <textarea
                    name="gameObjective"
                    id="gameObjective"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    defaultValue="Quelque part en pleine mer, un groupe de Marins est chargé de transporter un trésor. Cependant, des pirates se sont peut-être infiltrés parmi eux pour le voler. Entre tempêtes, mal de mer, sirènes, trahisons et autres dangers, le trésor arrivera-t-il à bon port ?">
                </textarea>
                <ul className="list-disc pl-6 text-gray-700 mt-4">
                    <li><strong className="text-blue-600">Pour les Marins et la Sirène :</strong> Identifier les pirates et former le bon équipage pour protéger le trésor.</li>
                    <li><strong className="text-blue-600">Pour les Pirates :</strong> Gagner la confiance des Marins, les empoisonner et voler le trésor.</li>
                </ul>
            </fieldset>

            {/* Section: Distribution des cartes */}
            <fieldset id="card-distribution" className="rules-section mb-8">
                <legend className="text-2xl font-bold text-blue-600 mb-4">VI. Distribution des cartes</legend>
                <textarea
                    name="cardDistribution"
                    id="cardDistribution"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    defaultValue="Les cartes sont distribuées en fonction du nombre de joueurs comme suit :">
                </textarea>
                <table className="table-auto border-collapse w-full text-gray-700 mt-4">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="border border-gray-300 px-4 py-2">Nombre de joueurs</th>
                            <th className="border border-gray-300 px-4 py-2">Pirates</th>
                            <th className="border border-gray-300 px-4 py-2">Marins</th>
                            <th className="border border-gray-300 px-4 py-2">Sirène</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">7</td>
                            <td className="border border-gray-300 px-4 py-2">3</td>
                            <td className="border border-gray-300 px-4 py-2">3</td>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">8</td>
                            <td className="border border-gray-300 px-4 py-2">3</td>
                            <td className="border border-gray-300 px-4 py-2">4</td>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>

            {/* Section: Déroulement d'une partie */}
            <fieldset id="game-progress" className="rules-section mb-8">
                <legend className="text-2xl font-bold text-blue-600 mb-4">VII. Déroulement d'une partie</legend>
                <textarea
                    name="gameProgress"
                    id="gameProgress"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    defaultValue="Les joueurs désignent ou tirent au sort un capitaine. Le capitaine distribue à chaque joueur une carte rôle et une carte bonus, que les joueurs consultent discrètement avant de les poser face cachée. Ensuite, tous les joueurs ferment les yeux, et le capitaine demande aux pirates et à la sirène d'ouvrir les yeux pour se reconnaître. Tous referment ensuite les yeux avant de les rouvrir pour démarrer la partie.">
                </textarea>
            </fieldset>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none">
                Valider
            </button>
        </form>
    );
};

export default GameRulesPage;