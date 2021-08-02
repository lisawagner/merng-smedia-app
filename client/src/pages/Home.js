import React from "react";
import { useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
  // const {
  //   loading,
  //   data: { getPosts: posts },
  // } = useQuery(FETCH_POSTS_QUERY);

  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={1} className="home">
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {/* {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )} */}
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      likeCount
      commentCount
      createdAt
      body
      username
      comments {
        id
        username
        body
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export default Home;
