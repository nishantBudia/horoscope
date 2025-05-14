import express from 'express';
import authRoutes from './routes/v1/auth.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config.js';
import { Authenticator } from './middleware/auth.middleware.js';
import errorHandler from './middleware/error-handler.middleware.js';
import horoscopeRoutes from './routes/v1/horoscope.routes.js';
import { rateLimiter } from './middleware/rate-limit.middleware.js';

const app = express();

app.use(express.json());

app.use('/v1/api/', rateLimiter);
app.use(Authenticator);

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/horoscope/', horoscopeRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
