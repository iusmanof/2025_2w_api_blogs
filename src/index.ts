import express, {Request, Response} from "express";
import {BlogRouter} from "./routers/BlogRouters";
import {PostRouter} from "./routers/PostRouters";
import {blogDataAccessLayer} from "./dataAccessLayer/blog-data-access-layer";
import {postAccessLayer} from "./dataAccessLayer/post-data-access-layer";

const app = express()
const port = process.env.port || 3000

app.use(express.json());
app.use('/blogs', BlogRouter)
app.use('/posts', PostRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('blogs api')
  })

app.delete('/testing/all-data', (req: Request, res: Response) => {
  blogDataAccessLayer.deleteAllBlogs()
  postAccessLayer.deleteAllPosts()
  res.status(204).send("All data is deleted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;
