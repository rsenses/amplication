import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type CommentUpdateInput = {
  content?: string;
  name?: string;
  post?: PostWhereUniqueInput;
};
