import { createContext } from "react";

interface PostProps {
  authorId: number,
  post: API.Post,
  getPostDetail: () => void,
}

export const PostContext = createContext<PostProps>({
  authorId: -1,
  post: {} as API.Post,
  getPostDetail: () => { },
});


interface CommentProps {
  commentList: API.Comment[],
  commentMap: Map<string, API.Comment>,
  addComment: (comment: string, commentId: string | undefined) => void,
  deleteComment: (commentId: string) => void,
}

export const CommentContext = createContext<CommentProps>({
  commentList: [],
  commentMap: new Map(),
  deleteComment: () => { },
  addComment: () => { },
});