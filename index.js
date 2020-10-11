
import server from './config/server';
import './config/database.js';


const PORT = process.env.PORT || 3000;

// Sarting the Server
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});