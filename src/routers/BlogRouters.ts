import {Router, Request, Response} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {RequestWithParams} from "../model_types/RequestTypes";
import {BlogViewModel} from "../model_types/BlogViewModel";
import {basicAuth} from "../auth";
import {FieldError} from "../model_types/FieldError";
import {nameValidation} from "../bodyValidation/nameValidation";
import {websiteValidation} from "../bodyValidation/websiteValidation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {blogDataAccessLayer} from "../dataAccessLayer/blog-data-access-layer";

export const BlogRouter = Router();

BlogRouter.get("/", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK_200).send(blogDataAccessLayer.getAllBlogs());
})
BlogRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
  const blogFounded = blogDataAccessLayer.getBlogById(req.params.id)
  if (!blogFounded) res.status(HTTP_STATUS.NOT_FOUND_404).send("Blog not found.")
  res.status(200).json(blogFounded)
})

BlogRouter.post('/', basicAuth,
  [
    nameValidation,
    websiteValidation,
  ],
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const blogCreated= blogDataAccessLayer.createBlog(req.body)
    return res.status(HTTP_STATUS.CREATED_201).json(blogCreated);
  }
);

BlogRouter.put('/:id', basicAuth,  [
    nameValidation,
    websiteValidation,
  ],
  inputValidationMiddleware,
  (req: Request, res: Response<BlogViewModel | {
  errorsMessages: FieldError[]
}>) => {
    const blogIsUpdated = blogDataAccessLayer.updateBlog(req.params.id, req.body)
    const apiErrorMsg: FieldError[] = []
    if (!blogIsUpdated){
      apiErrorMsg.push({message: "ID Not found", field: "id"})
      return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
    }
    return res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

BlogRouter.delete('/:id', basicAuth, (req: RequestWithParams<{ id: string }>, res: Response) => {
  const blog = blogDataAccessLayer.deleteBlog(req.params.id)
  if (!blog) res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})
