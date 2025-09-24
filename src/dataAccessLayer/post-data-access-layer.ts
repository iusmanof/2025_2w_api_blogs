import {PostViewModel} from "../model_types/PostViewModel";
import {blogDataAccessLayer} from "./blog-data-access-layer";


let postsDB: PostViewModel[]  = []

export const postAccessLayer = {
  getAllPosts:  () => {
    return postsDB;
  },
  getPostById:  (id: string) => {
    let postFounded: PostViewModel | undefined;
    postFounded = postsDB.find(post => post.id === id)
    return postFounded
  },
  createPost:  (post: PostViewModel) => {
    const blog = blogDataAccessLayer.getBlogById(post.blogId);
    const postCreated: PostViewModel = {
      id: Math.floor(Math.random()*1000000).toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: blog ? blog.name : "Unknown"
    }
    postsDB = [...postsDB, postCreated]
    return postCreated
  },
  deletePost:  (id: string) => {
    const postID = postsDB.findIndex(p => p.id === id)

    if (postID === -1) {
      return false
    } else {
      postsDB.splice(postID, 1);
      return true
    }
  },
  updatePost:  (id: string, post: PostViewModel) => {
    const postID =postsDB.findIndex(p => p.id === id)

    if (postID === -1) {
      return false
    } else{
      const blog = blogDataAccessLayer.getBlogById(post.blogId)
      const postUpdated: PostViewModel = {
        ...postsDB[postID],
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: blog ? blog.name : "Unknown"
      }
      postsDB = [
        ...postsDB.slice(0, postID),
        postUpdated,
        ...postsDB.slice(postID + 1)
      ]

      return true
    }

  },
  deleteAllPosts:  () => {
    postsDB = [];
  },
}
