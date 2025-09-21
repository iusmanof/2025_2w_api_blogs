import express, {Request, Response} from "express";

const app = express()
const port = process.env.port || 3000
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('blogs api')
  }
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;
