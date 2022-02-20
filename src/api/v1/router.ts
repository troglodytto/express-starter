import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import docs from './docs';

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

export default router;
