import express, {Request, Response} from "express";
import {BlogRouter} from "./routers/BlogRouters";
import {PostRouter} from "./routers/PostRouters";
import { deleteAllBlogs} from "./DB/blogsDB";
import { deleteAllPosts} from "./DB/postsDB";

const app = express()
const port = process.env.port || 3000

app.use(express.json());
app.use('/blogs', BlogRouter)
app.use('/posts', PostRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('blogs api')
  })

app.delete('/testing/all-data', (req: Request, res: Response) => {
  deleteAllBlogs()
  deleteAllPosts()
  res.status(204).send("All data is deleted")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;
