import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjrsxzuuvihvcxsvuegx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcnN4enV1dmlodmN4c3Z1ZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NjE4MDEsImV4cCI6MjAzNDAzNzgwMX0.zpkbfkaqQU0ixqLtOwXJqZm5sSB4wRVILpRDCupiBUM'
const supabase = createClient(supabaseUrl, supabaseKey)

import emailjs from '@emailjs/browser';

let queue = Promise.resolve();

const addFromCart = async ({ mail, proid, stock, price }) => {

  const task = async () => {
    try {
      // Insert data into Orders table
      const { data, error } = await supabase.from('Orders').insert({
        email: mail,
        pro_id: proid,
        quantity: stock,
        price: price*stock
      });

      if (error) {
        throw error;
      }

      // Retrieve the most recent order details
      const { data: recentOrder, error: orderError } = await supabase
        .from('Orders')
        .select('*, Product(name, image), Users(username)')
        .eq('email', mail)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (orderError) {
        throw orderError;
      }

      console.log(recentOrder);

      // Prepare email data
      const order = recentOrder;
      const getDateTwoDaysAhead = (timestamp) => {
        const date = new Date(timestamp);
        date.setDate(date.getDate() + 0);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
      };

      // Send email using emailjs
      const emailParams = {
        from_name: 'Cake N Bake',
        to_name: order.Users.username,
        date: getDateTwoDaysAhead(order.created_at),
        url: order.Product.image,
        pro: order.Product.name,
        quantity: order.quantity,
        price: order.price,
        to_email: order.email
      };

      const emailResponse = await emailjs.send(
       "service_7i7k46s","template_uvkyxmq",
        emailParams,
        {
          publicKey: 'IEk2rKb8gHnHQ8nir',
        }
      );

      console.log('Email sent successfully:', emailResponse);

    } catch (error) {
      console.error('Error:', error.message);
      throw error; 
    }
  };

  
  queue = queue.then(task).catch((error) => {
    console.error('Queue error:', error.message);
  });
};

export default addFromCart;
