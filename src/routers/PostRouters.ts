import {Request, Response, Router} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {RequestWithBody, RequestWithParams} from "../model_types/RequestTypes";
import {PostViewModel} from "../model_types/PostViewModel";
import {basicAuth} from "../auth";
import {APIErrorResult} from "../model_types/APIErrorResult";
import {FieldError} from "../model_types/FieldError";
import {postAccessLayer} from "../dataAccessLayer/post-data-access-layer";

export const PostRouter = Router();

PostRouter.get("/", (req, res) => {
  res.status(HTTP_STATUS.OK_200).send(postAccessLayer.getAllPosts())
})
PostRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
  // const foundPost: PostViewModel | undefined = postsDB.find(v => v.id === req.params.id)
  //
  // if (!foundPost) {
  //   res.status(HTTP_STATUS.NOT_FOUND_404).send("No posts found.")
  // }
  // res.status(200).json(foundPost)
  const postFounded = postAccessLayer.getPostById(req.params.id);
  if (!postFounded)  res.status(HTTP_STATUS.NOT_FOUND_404).send("No posts found.")
  res.status(200).json(postFounded)
})

PostRouter.post('/', basicAuth, async (req: RequestWithBody<PostViewModel>, res: Response<PostViewModel | {
  errorsMessages: APIErrorResult[]
}>) => {
  // const {title, shortDescription, content, blogId} = req.body
  // const createdPost: PostViewModel = {
  //   id: Math.floor(Math.random() * 1000000).toString(),
  //   title: title!,
  //   shortDescription: shortDescription!,
  //   content: content,
  //   blogId: blogId,
  //   blogName: getBlogNameById(blogId)
  // }
  // addPost(createdPost)
  // res
  //   .status(HTTP_STATUS.CREATED_201)
  //   .json(createdPost)
  const postCreated = await postAccessLayer.createPost(req.body)
  res.status(HTTP_STATUS.CREATED_201).json(postCreated)
})


PostRouter.put('/:id', basicAuth, (req: Request, res: Response<PostViewModel | {
  errorsMessages: FieldError[]
}>) => {
  // const postId = postsDB.findIndex(v => +v.id === +req.params.id)
  // const apiErrorMsg: FieldError[] = []
  // if (postId === -1) {
  //   apiErrorMsg.push({message: "ID Not found", field: "id"})
  //   return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
  // }
  // const updatedPost: PostViewModel = {
  //   ...postsDB[postId],
  //   title: req.body.title,
  //   shortDescription: req.body.shortDescription,
  //   content: req.body.content,
  //   blogId: req.body.blogId,
  //   blogName: req.body.blogName,
  // }
  //
  // updatePost(updatedPost, postId)
  // return res.status(HTTP_STATUS.NO_CONTENT_204).send()
  const postIsUpdated = postAccessLayer.updatePost(req.params.id, req.body)
  const apiErrorMsg: FieldError[] = []
  if (!postIsUpdated){
    apiErrorMsg.push({message: "ID Not found", field: "id"})
    return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
  }
  return res.status(HTTP_STATUS.NO_CONTENT_204).send()
})
PostRouter.delete('/:id', basicAuth, (req: RequestWithParams<{ id: string }>, res: Response) => {
  // const postId = postsDB.findIndex(v => v.id === req.params.id)
  // if (postId === -1) {
  //   res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  // }
  // deleteBlog(req.params.id)
  // res.status(HTTP_STATUS.NO_CONTENT_204).send()

  const post = postAccessLayer.deletePost(req.params.id)
  if (!post) res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

