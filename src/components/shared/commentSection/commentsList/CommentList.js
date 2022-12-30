import { useQuery } from "@apollo/client";
import { CircularProgress, Divider, List } from "@mui/material";
import React from "react";
import { GET_POST_COMMENTS } from "../../../../GraphQL/gqls";
import ShowError from "../../ShowError";
import CommentItem from "./CommentItem";

const CommentList = ({ postSlug }) => {
  const { loading, data, error } = useQuery(GET_POST_COMMENTS, {
    variables: {
      slug: postSlug,
    },
  });

  console.log({ data, loading, error });

  if (error) return <ShowError error="یه اتفاق بدی افتاده" />;
  if (loading) return <CircularProgress color="success" />;

  const { commentS } = data.post;
  console.log(commentS);

  if (commentS.length === 0) return <p>هیچ دیدگاهی ثبت نشده است</p>;

  return (
    <List sx={{ width: "100%" }}>
      {commentS.map((comment, index) => (
        <React.Fragment key={comment.id}>
          <CommentItem comment={comment} />
          {index < commentS.length - 1 && <Divider variant="middle" sx={{my:2}} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default CommentList;
