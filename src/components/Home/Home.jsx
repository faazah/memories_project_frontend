import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {Container,Grow, Grid, Paper, AppBar, TextField, Button} from "@material-ui/core";
import { MuiChipsInput } from 'mui-chips-input'
import { useLocation, useNavigate } from "react-router-dom";

import { Posts } from "../Posts/Posts";
import { Form } from "../Form/Form";
import { getPostsBySearch } from "../../actions/posts";
import Paginate from "../Pagination/Pagination";
import useStyles from './styles';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    
    const handleKeyDown = (e) =>{
      if(e.keyCode === 13){ //13 ist the code for enter button
        searchPost();
      }
    }

    const handleAdd = (tag) =>{
      setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) =>{
      setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    const searchPost = () =>{
      if(search.trim() || tags){
        dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        navigate('/');
      }
    }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name="search"
                variant="outlined"
                fullWidth
                onKeyDown={handleKeyDown}
                label="Search Memories"
                value={search}
                onChange={(e) =>setSearch(e.target.value)}
              />
              <MuiChipsInput 
                style={{margin: '10px 0'}}
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                label='Search Tags'
                variant="outlined"
              />
              <Button 
                onClick={searchPost} 
                variant='contained' 
                className={classes.searchButton} 
                color="primary"
              >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {
              (!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.paginate}>
                <Paginate page={page}/>
              </Paper>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
