import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './midlewere/globalErrorHandler';
import notFoundRoute from './midlewere/notFoundRoute';
import router from './app/modules/route';
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

app.use('/api', router);

const getController = (req: Request, res: Response) => {
  res.send('hello world');
};
app.get('/', getController);

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
