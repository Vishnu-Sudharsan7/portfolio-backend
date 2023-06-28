const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

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

// Define a schema and model for your data
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  About:String,
  area_of_interest:Object,
  Projects:String,
  Years_of_Experience:String,
  Education:String,
  Project1_title:String,
  Project1_description:String,
  Project2_title:String,
  Project2_description:String,
  Project3_title:String,
  Project3_description:String,
  Company_name:String,
  About_the_role:String,
  link1:String,
});

const Item = mongoose.model('Details', itemSchema);

// Function to insert sample data
const insertSampleData = () => {
  const sampleData = [
    { name: 'Vishnu Sudharsan', description: 'Software Enthusiast', About:'An aspiring Software enthusiast with solid communiqué and a squad player thriving to pursue a career in application development, Backend Development, and Product Management with good programming skills and solid knowledge in application development.',
area_of_interest:{frontend:"Flutter,HTML,CSS,ReactJS",backend:"Odoo,Node,Python,MongoDB,MYSQL"},Projects:'3 deployed application and 8+ projects',Years_of_Experience:'1 year',Education:'MSc Decision and Computing Sciences',
Project1_title:"Soulocal E-Commerce application",Project1_description:"blah blah",Project2_title:'Soulocal shopper app',Project2_description:"blah blah",Project3_title:"Soulocal rider application",
Project3_description:"balh balh",Company_name:"Soulocal",About_the_role:"I had a great experience as an Intern at Soulocal. I was working in various roles which includes application development and product management. I got a chance to improve my programming and management skills. I got a chance to lay hands on deployed projects where I could see my works in action. Soulocal was a great place for me to explore new techs and start my new journey as an application developer.",
link1:"https://play.google.com/store/apps/details?id=com.soulocal.customer" },
    
  ];

  Item.insertMany(sampleData)
    .then(() => {
      console.log('Sample data inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting sample data:', error);
    });
};

// API endpoint to fetch data
app.get('/data', (req, res) => {
  Item.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
