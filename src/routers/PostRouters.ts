import {Request, Response, Router} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {RequestWithParams} from "../model_types/RequestTypes";
import {PostViewModel} from "../model_types/PostViewModel";
import {basicAuth} from "../auth";
import {FieldError} from "../model_types/FieldError";
import {postAccessLayer} from "../dataAccessLayer/post-data-access-layer";
import {titleValidation} from "../bodyValidation/titleValidation";
import {contentValidation} from "../bodyValidation/contentValidation";
import {shortDescriptionValidation} from "../bodyValidation/shortDescriptionValidation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const PostRouter = Router();

PostRouter.get("/", (req, res) => {
  res.status(HTTP_STATUS.OK_200).send(postAccessLayer.getAllPosts())
})
PostRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
  const postFounded = postAccessLayer.getPostById(req.params.id);
  if (!postFounded) res.status(HTTP_STATUS.NOT_FOUND_404).send("No posts found.")
  res.status(200).json(postFounded)
})

PostRouter.post('/', basicAuth,
  [titleValidation, contentValidation, shortDescriptionValidation],
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const postCreated = postAccessLayer.createPost(req.body)
    const apiErrorMsg: FieldError[] = []
    if (!postCreated) {
      apiErrorMsg.push({message: "ID Not found", field: "id"})
      res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
    }
    res.status(HTTP_STATUS.CREATED_201).json(postCreated)
  })

PostRouter.put('/:id', basicAuth,
  [titleValidation, contentValidation, shortDescriptionValidation],
  inputValidationMiddleware,
  (req: Request, res: Response<PostViewModel | {
    errorsMessages: FieldError[]
  }>) => {
    const postIsUpdated = postAccessLayer.updatePost(req.params.id, req.body)
    const apiErrorMsg: FieldError[] = []
    if (!postIsUpdated) {
      apiErrorMsg.push({message: "ID Not found", field: "id"})
      return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
    }
    return res.status(HTTP_STATUS.NO_CONTENT_204).send()
  })
PostRouter.delete('/:id', basicAuth, (req: RequestWithParams<{ id: string }>, res: Response) => {
  const post = postAccessLayer.deletePost(req.params.id)
  if (!post) res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

