import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class CommentUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  content?: string;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;
  @ApiProperty({
    required: false,
    type: PostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PostWhereUniqueInput)
  @IsOptional()
  @Field(() => PostWhereUniqueInput, {
    nullable: true,
  })
  post?: PostWhereUniqueInput;
}
export { CommentUpdateInput };
