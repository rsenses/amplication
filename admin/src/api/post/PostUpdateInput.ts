import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type PostUpdateInput = {
  content?: string | null;
  title?: string;
  user?: UserWhereUniqueInput;
};
