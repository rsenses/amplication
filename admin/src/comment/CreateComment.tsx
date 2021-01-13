import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PostSelect } from "../post/PostSelect";
import { Comment } from "../api/comment/Comment";
import { CommentCreateInput } from "../api/comment/CommentCreateInput";

const INITIAL_VALUES = {} as CommentCreateInput;

export const CreateComment = (): React.ReactElement => {
  useBreadcrumbs("/comments/new", "Create Comment");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Comment,
    AxiosError,
    CommentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/comments", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/comments"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CommentCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Comment"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Content" name="content" />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <PostSelect label="Post" name="post.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
