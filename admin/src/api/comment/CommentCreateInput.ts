import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type CommentCreateInput = {
  content: string;
  name: string;
  post: PostWhereUniqueInput;
};
