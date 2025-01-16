import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function POST(request : Request) {
   // try {

      const body = await request.json();
      console.log(body)

      const newfeedback = {created_at: new Date(),
        email: body.email,
        message: body.message,
        type: body.type
      }
      await prisma.feedback.create({
        data: newfeedback,
    });


            return new Response(JSON.stringify({ message: 'ok' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } })

    //   const { email, message } = body;
    //   if ( !email || !message) {
    //     return new Response(
    //       JSON.stringify({ error: 'All fields are required.' }),
    //       { status: 400, headers: { 'Content-Type': 'application/json' } }
    //     );
    //   }
  

    //   console.log('Contact Form Submission:', { email, message });
  
    //   return new Response(
    //     JSON.stringify({ success: 'Your message has been sent successfully!' }),
    //     { status: 200, headers: { 'Content-Type': 'application/json' } }
    //   );
    // } catch (error) {
    //   console.error('Error processing the contact form:', error);
    //   return new Response(
    //     JSON.stringify({ error: 'An error occurred while processing your request.' }),
    //     { status: 500, headers: { 'Content-Type': 'application/json' } }
    //   );
    }
  
  

