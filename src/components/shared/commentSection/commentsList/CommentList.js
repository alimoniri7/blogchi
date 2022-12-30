import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  List,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { GET_POST_COMMENTS } from "../../../../GraphQL/gqls";
import useInputHandler from "../../../../hooks/useInputHandler";
import ShowError from "../../ShowError";
import CommentItem from "./CommentItem";

const CommentList = ({ postSlug }) => {
  // state for number of comments load in every click
  const [skip, setSkip] = useState(0);

  const [isMore, setIsMore] = useState(true);

  const options = [
    {
      label: "جدید ترین",
      value: "createdAt_DESC",
    },
    {
      label: "قدیمی ترین",
      value: "createdAt_ASC",
    },
    {
      label: "مفید ترین",
      value: "like_DESC",
    },
  ];
  const [sort, sortHandler] = useInputHandler("createdAt_DESC");
  const [comments, setComments] = useState([]);

  const { loading, data, error } = useQuery(GET_POST_COMMENTS, {
    variables: {
      slug: postSlug,
      orderBy: sort,
      skip: 0,
    },
  });

  const [stableSort, setStableSort] = useState("");
  const [getMoreComments, moreCommentsRes] = useLazyQuery(GET_POST_COMMENTS, {
    variables: {
      slug: postSlug,
      orderBy: stableSort,
      skip: skip,
    },
  });

  const loadMore = () => {
    setSkip((prev) => prev + 5);
    setStableSort(sort);
  };

  useEffect(() => {
    if (skip) getMoreComments();
  }, [skip]);

  // add new more comments to comments list
  let didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      if (moreCommentsRes.data && skip) {
        setComments((prev) => [...prev, ...moreCommentsRes.data.post.commentS]);
        if (moreCommentsRes.data.post.commentS.length < 5) setIsMore(false);
      }
    } else {
      didMount.current = true;
    }
  }, [moreCommentsRes.data]);

  // add first comments to comments list and reset skip state
  useEffect(() => {
    if (data) {
      setComments([...data.post.commentS]);
      setSkip(0);
      if (data.post.commentS.length < 5) {
        setIsMore(false);
      } else setIsMore(true);
    }
  }, [data]);

  if (error) return <ShowError error="یه اتفاق بدی افتاده" />;
  if (loading) return <CircularProgress color="success" />;

  const { commentS } = data.post;
  if (commentS.length === 0) return <p>هیچ دیدگاهی ثبت نشده است</p>;

  return (
    <>
      <FormControl
        size="small"
        color="ForestGreen"
        variant="filled"
        hiddenLabel
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <Typography>ترتیب بر اساس:</Typography>
        <Select
          value={sort}
          onChange={sortHandler}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          defaultChecked
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List sx={{ width: "100%" }}>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <CommentItem comment={comment} />

            <Divider variant="middle" sx={{ my: 2 }} />
          </React.Fragment>
        ))}
      </List>

      <Box
        sx={
          !moreCommentsRes.loading
            ? {
                background:
                  "linear-gradient(0deg, rgba(164,197,237,1) 0%, rgba(255,255,255,0.6979166666666667) 92%)",
              }
            : {}
        }
        display={isMore ? "flex" : "none"}
      >
        {moreCommentsRes.loading ? (
          <CircularProgress sx={{ mx: "auto" }} color="warning" />
        ) : (
          <Button
            fullWidth
            sx={{ color: "NavyBlue.main", fontWeight: "800" }}
            onClick={loadMore}
            disabled={moreCommentsRes.loading ? true : false}
          >
            نمایش بیشتر
          </Button>
        )}
      </Box>
    </>
  );
};

export default CommentList;
