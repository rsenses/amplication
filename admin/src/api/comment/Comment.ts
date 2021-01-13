import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type Comment = {
  content: string;
  createdAt: Date;
  id: string;
  name: string;
  post: PostWhereUniqueInput;
  updatedAt: Date;
};
