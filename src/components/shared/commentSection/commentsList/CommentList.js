import { useLazyQuery, useQuery } from "@apollo/client";
import { Cache } from "@apollo/client/cache";
import { cacheSlot } from "@apollo/client/cache";
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
  const [skip, setSkip] = useState(0);

  const [sort, sortHandler] = useInputHandler("createdAt_DESC");
  const [comments, setComments] = useState([]);

  // let comments= []
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
    // getMoreComments()
  };

  useEffect(() => {
    if (skip) getMoreComments();
  }, [skip]);
  // if (moreCommentsRes.data) comments.push(...moreCommentsRes.data.post.commentS)

  console.log(moreCommentsRes);

  // console.log({ data, loading, error });
  // console.log(sort);

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

  let didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      // if (moreCommentsRes.data) comments= comments.concat(moreCommentsRes.data.post.commentS)
      if (moreCommentsRes.data && skip)
        setComments((prev) => [...prev, ...moreCommentsRes.data.post.commentS]);
      console.log(moreCommentsRes.data);
    } else {
      didMount.current = true;
    }
  }, [moreCommentsRes.data]);

  // console.log(moreCommentsRes.data);

  useEffect(() => {
    // if (didMount.current) {
    if (data) {
      setComments([...data.post.commentS]);
      setSkip(0);
    }

    // } else {
    //   didMount.current = true;
    // }
  }, [data]);

  if (error) return <ShowError error="یه اتفاق بدی افتاده" />;
  if (loading) return <CircularProgress color="success" />;

  const { commentS } = data.post;
  console.log(comments);

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
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <CommentItem comment={comment} />
            {index < commentS.length - 1 && (
              <Divider variant="middle" sx={{ my: 2 }} />
            )}
          </React.Fragment>
        ))}
      </List>
      <Button onClick={loadMore}>بیشتر</Button>
    </>
  );
};

export default CommentList;
