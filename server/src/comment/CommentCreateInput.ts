import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class CommentCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  content!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
  @ApiProperty({
    required: true,
    type: PostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PostWhereUniqueInput)
  @Field(() => PostWhereUniqueInput)
  post!: PostWhereUniqueInput;
}
export { CommentCreateInput };
