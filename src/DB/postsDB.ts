import {PostViewModel} from "../model_types/PostViewModel";
import {blogsDB} from "./blogsDB";

export let postsDB: PostViewModel[] = []

export function dalateAllPosts() {
  postsDB = [];
}
