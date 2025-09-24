import {BlogViewModel} from "../model_types/BlogViewModel";
import {BlogInputModel} from "../model_types/BlogInputModel";

let blogsDB: BlogViewModel[] = []

export const blogDataAccessLayer = {
  getAllBlogs(){
    return blogsDB;
  },
  createBlog (blog: BlogInputModel){
    const blogCreated: BlogViewModel = {
      id: Math.floor(Math.random() * 1000000).toString(),
      name: blog.name!,
      description: blog.description!,
      websiteUrl: blog.websiteUrl,
    };
    blogsDB = [...blogsDB, blogCreated]
    return blogCreated
  },
  getBlogById(id: string): BlogViewModel | undefined {
    let blogFounded: BlogViewModel | undefined;
    blogFounded = blogsDB.find(v => v.id === id);
    return blogFounded
  },
  updateBlog(id: string, blog: BlogInputModel){
    const blogID = blogsDB.findIndex(b => b.id === id)

    if (blogID === -1) {
      return false
    } else {
      const blogUpdated: BlogViewModel = {
        ...blogsDB[blogID],
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
      }
      blogsDB = [
        ...blogsDB.slice(0, blogID),
        blogUpdated,
        ...blogsDB.slice(blogID + 1)
      ]
      return true
    }
  },
  deleteBlog(id: string): boolean {
    const blogID = blogsDB.findIndex(v => v.id === id)

    if (blogID == -1){
      return false
    } else {
      blogsDB = blogsDB.filter(v => v.id !== id)
      return true
    }
  }
}
