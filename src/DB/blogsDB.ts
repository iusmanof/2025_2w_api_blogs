import {BlogViewModel} from "../model_types/BlogViewModel";

export let blogsDB: BlogViewModel[] = []

export function addBlog(blog: BlogViewModel) {
  blogsDB = [...blogsDB, blog]
}

export function updateBlog(blog: BlogViewModel, blogId: number) {
  blogsDB = [
    ...blogsDB.slice(0, blogId),
    blog,
    ...blogsDB.slice(blogId + 1)
  ]
}

export function deleteBlog(blogId: string) {
  blogsDB = blogsDB.filter(v => v.id !== blogId)
}
