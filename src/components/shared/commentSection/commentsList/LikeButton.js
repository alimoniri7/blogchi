import React, { useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@apollo/client";
import { LIKE_COMMENT, PUBLISH_COMMENT } from "../../../../GraphQL/gqls";
import { useEffect } from "react";

const LikeButton = ({ commentId, like }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);

  const [mutateLike, likeResponse] = useMutation(LIKE_COMMENT, {
    variables: {
      id: commentId,
      likeCount: likeCount,
    },
  });
  const [publish, publishRes] = useMutation(PUBLISH_COMMENT, {
    variables:{
        id:commentId
    }
  })
  console.log(publishRes);

  const likeHandler = () => {
    setIsLiked((prev) => !prev);
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
  };

  console.log(likeCount);

  const isInitialMount = useRef(false);

  useEffect(() => {
    if (isInitialMount.current) {
      console.log("Mutate");
      mutateLike();
    } else {
      isInitialMount.current = true;
    }
    console.log("hello");
  }, [likeCount]);

  useEffect(()=>{
    if(likeResponse.data) publish()
  },[likeResponse.data])

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Like">
        <Button onClick={likeHandler}>
          <Typography color="text.secondary" variant="body2">
            {likeCount}
          </Typography>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default LikeButton;
