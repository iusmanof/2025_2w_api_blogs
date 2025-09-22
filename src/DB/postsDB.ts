import {PostViewModel} from "../model_types/PostViewModel";

export let postsDB: PostViewModel[] = []

export function dalateAllPosts() {
  postsDB = [];
}

export function addPost(post: PostViewModel) {
  postsDB = [...postsDB, post]
}
