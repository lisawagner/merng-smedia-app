import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

// import { AuthContext } from "../context/auth";
// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  function likePost() {
    console.log("likePost");
  }
  function commentOnPost() {
    console.log("comment on post");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="left"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description as={Link} to={`/posts/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <LikeButton user={user} post={{ id, likes, likeCount }} /> */}

        <Button labelPosition="right" as={Link} to={`posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {/* {user && user.username === username && <DeleteButton postId={id} />} */}
      </Card.Content>
    </Card>
  );
}

export default PostCard;