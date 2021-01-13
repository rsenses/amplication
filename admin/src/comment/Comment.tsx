import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PostSelect } from "../post/PostSelect";
import { Comment as TComment } from "../api/comment/Comment";
import { CommentUpdateInput } from "../api/comment/CommentUpdateInput";

export const Comment = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/comments/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TComment,
    AxiosError,
    [string, string]
  >(["get-/api/comments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/comments"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TComment, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/comments"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//comments");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TComment, AxiosError, CommentUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/comments"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: CommentUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["content", "name", "post"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Comment"} ${
                  data?.name && data?.name.length ? data.name : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
