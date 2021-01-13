import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type PostWhereInput = {
  content?: string | null;
  createdAt?: Date;
  id?: string;
  title?: string;
  updatedAt?: Date;
  user?: UserWhereUniqueInput;
};
