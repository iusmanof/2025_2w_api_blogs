import {PostViewModel} from "../model_types/PostViewModel";
import {PostCreatedModel} from "../model_types/PostCreatedModel";

export let postsDB: PostViewModel[] | PostCreatedModel[] = []

export function deleteAllPosts() {
  postsDB = [];
}
export function addPost(post: PostCreatedModel) {
  postsDB = [...postsDB, post]
}
export function updatePost(blog: PostViewModel, postId: number) {
  postsDB = [
    ...postsDB.slice(0, postId),
    blog,
    ...postsDB.slice(postId + 1)
  ]
}
export function deletePost(postId: string) {
  postsDB = postsDB.filter(v => v.id !== postId)
}

