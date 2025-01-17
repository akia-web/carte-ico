export default function Dashboard() {
    return(
            <div className="w-[85%] m-auto">
                <h1 className="text-2xl text-blueColor">Dashboard</h1>

                <p>Parties</p>
                <div className="flex mt-2">
                <div className="bg-blueColor p-2.5 rounded-lg w-[150px] mr-2">
                    <h2 className="text-white">Jouées</h2>
                    <p className="text-white">616</p>
                </div>

                <div className="bg-blueColor p-2.5 rounded-lg  w-[150px]">
                    <h2 className="text-white">Abandonnées</h2>
                    <p className="text-white">148</p>
                </div>
                </div>

                <div className="flex justify-between mt-2">
                    <div className="bg-blueColor p-2.5 rounded-lg w-[150px]">
                        <h2 className="text-white">Temps moyen</h2>
                        <p className="text-white">43 min</p>
                    </div>
                </div>
                
                <p className="mt-2">Utilisateurs</p>

                <div className="flex mt-2">
                    <div className="bg-blueColor p-1.5 rounded-lg w-[150px] mr-2">
                        <h2 className="text-white">Inscrits</h2>
                        <p className="text-white">512</p>
                    </div>

                    <div className="bg-blueColor p-1.5 rounded-lg w-[150px]">
                        <h2 className="text-white">Ont acheté le jeu</h2>
                        <p className="text-white">321</p>
                    </div>
                </div>

            </div>
    )
}