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

BlogRouter.get("/", async (req: Request, res: Response) => {
  await res.status(HTTP_STATUS.OK_200).send(blogDataAccessLayer.getAllBlogs());
})
BlogRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
  // const foundBlog: BlogViewModel | undefined = blogsDB.find(v => +v.id === +req.params.id)
  // if (!foundBlog) {
  //   res.status(HTTP_STATUS.NOT_FOUND_404).send("No blogs found.")
  // }

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
    // const {name, description, websiteUrl} = req.body;
    // const createdBlog: BlogViewModel = {
    //   id: Math.floor(Math.random() * 1000000).toString(),
    //   name: name!,
    //   description: description!,
    //   websiteUrl: websiteUrl,
    // };
    // addBlog(createdBlog);
    const createdBlog= blogDataAccessLayer.createBlog(req.body)
    return res.status(HTTP_STATUS.CREATED_201).json(createdBlog);
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

  // const blogId = blogsDB.findIndex(v => +v.id === +req.params.id)

  // if (blogId === -1) {
  //   apiErrorMsg.push({message: "ID Not found", field: "id"})
  //   return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
  // }

  // const updatedBlog: BlogViewModel = {
  //   ...blogsDB[blogId],
  //   name: req.body.name,
  //   description: req.body.description,
  //   websiteUrl: req.body.websiteUrl,
  // }
  //
  // updateBlog(updatedBlog, blogId)
  // return res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

BlogRouter.delete('/:id', basicAuth, (req: RequestWithParams<{ id: string }>, res: Response) => {
  // const blogId = blogsDB.findIndex(v => v.id === req.params.id)
  // if (blogId === -1) {
  //
  // }
  //
  // deleteBlog(req.params.id)
  // res.status(HTTP_STATUS.NO_CONTENT_204).send()
  const blog = blogDataAccessLayer.deleteBlog(req.params.id)
  if (!blog) res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})
