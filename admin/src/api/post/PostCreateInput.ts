import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type PostCreateInput = {
  content?: string | null;
  title: string;
  user: UserWhereUniqueInput;
};
