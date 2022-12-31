import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentForm from '../CommentForm'

const ReplyButton = ({commentId}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="پاسخ">
        <IconButton aria-label="پاسخ" onClick={handleClickOpen}>
          <ReplyIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
        <DialogTitle>ارسال پاسخ برای ...</DialogTitle>
        <DialogContent width="100%">
            <CommentForm replyForm commentId={commentId} closeReplyPopup={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReplyButton;
