import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";
@ObjectType()
class Comment {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  content!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
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
  post!: PostWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Comment };
