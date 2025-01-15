import { NextResponse } from 'next/server';

// Tableau pour garder la trace des clients connectés
let clients: any[] = [];
let currentMessage = 'Hello from the server'; // Message initial


export async function GET() {
  // Créer un ReadableStream pour envoyer des données aux clients
  const stream = new ReadableStream({
    start(controller) {
      // Créer une réponse avec les en-têtes nécessaires pour SSE
      const response = new NextResponse(null, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });

      // Ajouter le client à la liste des clients connectés
      clients.push(response);

      // Fonction pour envoyer un message aux clients
      const sendEvent = () => {
        const data = JSON.stringify({ message: currentMessage });
        controller.enqueue(`data: ${data}\n\n`);
      };

      // Envoi initial du message
      sendEvent();

      // Nettoyer les clients déconnectés (mécanisme de nettoyage)
      setInterval(() => {
        clients = clients.filter(client => client !== response);
      }, 5000);  // Vérifie tous les 5 secondes si un client est déconnecté

      // Retourner la réponse pour ne pas générer l'erreur
      return response;
    },
  });

  // Assurer que le stream soit retourné avec la réponse
  return new NextResponse(stream);
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log('lala')
  console.log(body)
//   const users: {users: string} = body;

//   if (users) {
//     console.log(users)
//     // Mise à jour du message actuel
//     currentMessage = users.users;

//     // Diffuser le message mis à jour à tous les clients connectés
//     if(clients.length >0){
//         clients.forEach(client => {
//             console.log({ message: currentMessage })
//             // const data = JSON.stringify({ message: currentMessage });
//             // client.write(`data: ${data}\n\n`);
//           });
      
//           return NextResponse.json({ message: currentMessage });
    // }else{
        return NextResponse.json({ message: 'no client' })
    // }
   
//   } else {
//     // S'assurer que l'on retourne une réponse même en cas d'erreur
//     return NextResponse.json({ error: 'No new message provided' }, { status: 400 });
//   }
}