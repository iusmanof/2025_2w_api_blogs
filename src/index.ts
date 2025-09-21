import express, {Request, Response} from "express";

const app = express()
const port = process.env.port || 4000
app.use(express.json());

app.get('/', (req:Request, res: Response) => {
    res.send('video api')
  }
)

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

export default app;
