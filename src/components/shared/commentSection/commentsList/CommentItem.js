import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import LikeButton from "./LikeButton";
import ReplyButton from './ReplyButton'

const CommentItem = ({ comment }) => {


  const description= comment.description.replace(/\n/g, "<br />")
  // console.log(comment);

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ width: "100%" }} disablePadding>
        <ListItemAvatar>
          {comment.avatar ? 
            <Avatar alt={comment.fullName} src={comment.avatar.url} />
           : 
            <Avatar alt={comment.fullName} src="/static/images/avatar/1.jpg" />
          }
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography textAlign="right">{comment.fullName}</Typography>
          }
          secondary={
            <Typography textAlign="right">
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                textAlign="right"
                dangerouslySetInnerHTML={{__html: description}}
              >

              </Typography>
            </Typography>
          }
        />
      </ListItem>
      <Box
        margin={0}
        padding="none"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Button>پاسخ ها</Button>
        </Box>
        <Box display="flex">
          <LikeButton like={comment.like} commentId={comment.id} />
          <ReplyButton commentId={comment.id}/>
        </Box>
      </Box>
      {/* <ListItem alignItems="flex-start" sx={{width: '100%'}}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography textAlign='right' >سلام طوری!</Typography>
                  }
                  secondary=
                  {<Box textAlign='right' sx={{textAlign: 'right'}}  >
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        textAlign='right'
                        >
                        علی منیری
                        </Typography>
                            {" — سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری سلام چطوری "}
                   </Box>}
                />
            </ListItem>
                <Box >
                    <Button>پاسخ</Button>
                </Box>
            <ListItem alignItems="flex-start" sx={{width: '100%'}}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography textAlign='right' >سلام پطوری!</Typography>
                  }
                  secondary=
                  {<Box textAlign='right' display='flex' >
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        textAlign='right'
                        >
                        Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                   </Box>}
                />
            </ListItem> */}
    </>
  );
};

export default CommentItem;
