const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/project33test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Insert sample data on successful connection
    insertSampleData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  global.value='';

// Define a schema and model for your data
const itemSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  description: String,
  About: String,
  area_of_interest: Object,
  Projects: String,
  Years_of_Experience: String,
  Education: String,
  Project1_title: String,
  Project1_description: String,
  Project2_title: String,
  Project2_description: String,
  Project3_title: String,
  Project3_description: String,
  Company_name: String,
  About_the_role: String,
  link1: String,
});

const Item = mongoose.model('Details', itemSchema);

// Function to insert sample data
const insertSampleData = () => {
  const sampleData = [
    {
      name: 'Vishnu Sudharsan',
      username: 'VS',
      email: 'qwerty@gmail.com',
      password: 'qwerty',
      description: 'Software Enthusiast',
      About:
        'An aspiring Software enthusiast with solid communiqué and a squad player thriving to pursue a career in application development, Backend Development, and Product Management with good programming skills and solid knowledge in application development.',
      area_of_interest: {
        frontend: 'Flutter, HTML, CSS, ReactJS',
        backend: 'Odoo, Node, Python, MongoDB, MYSQL',
      },
      Projects: '3 deployed application and 8+ projects',
      Years_of_Experience: '1 year',
      Education: 'MSc Decision and Computing Sciences',
      Project1_title: 'Soulocal E-Commerce application',
      Project1_description: 'blah blah',
      Project2_title: 'Soulocal shopper app',
      Project2_description: 'blah blah',
      Project3_title: 'Soulocal rider application',
      Project3_description: 'balh balh',
      Company_name: 'Soulocal',
      About_the_role:
        'I had a great experience as an Intern at Soulocal. I was working in various roles which includes application development and product management. I got a chance to improve my programming and management skills. I got a chance to lay hands on deployed projects where I could see my works in action. Soulocal was a great place for me to explore new techs and start my new journey as an application developer.',
      link1: 'https://play.google.com/store/apps/details?id=com.soulocal.customer',
    },
  ];

  // Item.insertMany(sampleData)
  //   .then(() => {
  //     console.log('Sample data inserted successfully');
  //   })
  //   .catch((error) => {
  //     console.error('Error inserting sample data:', error);
  //   });
};

// API endpoint to fetch data
app.get('/data', (req, res) => {
  condition={username:value}
  Item.find(condition)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    // Check if required fields are provided
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = new Item({ username, password, email });

  user.save()
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});




app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Item.findOne({ username, password });
    if (user) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});



app.post('/login_port', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Item.findOne({ username, password });
    if (user) {
      global.value=username;
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});


// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
