import {PostViewModel} from "../model_types/PostViewModel";

export let postsDB: PostViewModel[] = []

export function deleteAllPosts() {
  postsDB = [];
}

export function addPost(post: PostViewModel) {
  postsDB = [...postsDB, post]
}
