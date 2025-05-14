import { mongoConnection } from './config/mongo.config.js';
import 'dotenv/config.js';
import app from './app.js';

const port = process.env.PORT || 3000;

(async () => {
    await mongoConnection();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})();
