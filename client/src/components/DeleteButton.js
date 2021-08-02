import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      //   Remove post from cache once it is deleted
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // data.getPosts = data.getPosts.filter((p) => p.id !== postId);
      // proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((p) => p.id !== postId),
        },
      });

      if (callback) callback();
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        icon="trash"
        onClick={() => setConfirmOpen(true)}
      ></Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
