import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjrsxzuuvihvcxsvuegx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcnN4enV1dmlodmN4c3Z1ZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NjE4MDEsImV4cCI6MjAzNDAzNzgwMX0.zpkbfkaqQU0ixqLtOwXJqZm5sSB4wRVILpRDCupiBUM'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"



export const POST = async(req,res)=>{

    function extractUsername(email) {

        let parts = email.split('@');
        let username = parts[0];

        let capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    
        return capitalizedUsername;
    }
    
    
    const data1 = await req.json()


    const myemail = data1.data.email_addresses[0].email_address
    const namam = extractUsername(myemail)

    const {data,error} = await supabase.from('Users').insert({email : myemail,username : namam})

    if(error)
    {
        return NextResponse.json({error},{status:500})
    }
    else
    {
        return NextResponse.json({msg:myemail},{status:200})
    }

}