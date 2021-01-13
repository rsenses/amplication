import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type CommentWhereInput = {
  content?: string;
  createdAt?: Date;
  id?: string;
  name?: string;
  post?: PostWhereUniqueInput;
  updatedAt?: Date;
};
