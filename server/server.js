const express = require('express');
// const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');

// Load environment variables first
dotenv.config();

// // Initialize Supabase config // Moved to config/supabaseClient.js
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.status(200).send(`<h1>Hello Backend!</h1>`);
});

app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
