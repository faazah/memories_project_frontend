import { useSelector } from "react-redux";
import {Grid, CircularProgress} from "@material-ui/core";
import { Post } from "./Post/Post"
import useStyles from './styles';

export const Posts = ({setCurrentId}) =>{
    const classes = useStyles();
    const {posts, isLoading} = useSelector((store) => store.posts);

    if(!posts.length && !isLoading) return 'No Posts';

    return (
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}