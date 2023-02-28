import React, {useState} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";


export const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const { _id, name, creator, message, title, createdAt, selectedFile, tags } =
  post;

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === (userId));

  const handleLike = async () =>{
    dispatch(likePost(_id));

    if(hasLikedPost){
      setLikes(post.likes.filter((id) => id !== (userId)))
    }else{
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (userId)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () =>{
    navigate(`/posts/${_id}`)
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={selectedFile}
          title={title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(_id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(_id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
