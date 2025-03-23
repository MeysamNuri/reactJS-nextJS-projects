import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import Axios from "axios";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TypographyPage from "../typography";
import Typography from "@material-ui/core/Typography";
import useStyle from './styles'
import IconButton from "@material-ui/core/IconButton";
import { Close, Delete } from "@material-ui/icons";

const MoviesList = () => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [openModal,setOpenModal] = useState(false);

  const classes = useStyle();

  useEffect(() => {
    Axios.get("https://imdb8.p.rapidapi.com/title/get-videos?limit=25&region=US&tconst=tt0944947",
      {
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key": "824bfb2c51msh7b7ef2e34c46390p12f334jsndc45ddab20cd",
        },
      })
      .then(response => {
        console.log(response.data);
        setMovies(response.data.resource.videos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onItemClick=(movie)=>{
    setSelectedMovie(movie);
    setOpenModal(true);
  };

  const transform = () => {
    return movies.map(item => {
      return [
        <img src={item.image.url} height={50} width={50} onClick={()=>onItemClick(item)}/>,
        item.title,
        item.audioLanguage,
        item.durationInSeconds,
        item.primaryTitle.season
      ];
    });
  };

  return (
    <div>
      <PageTitle title={"لیست فیلم ها"}/>
      <Grid container>
        <Grid item xs={12}>
          <MUIDataTable
            title="فیلم ها"
            data={transform()}
            columns={["تصویر فیلم", "عنوان", "زبان", "زمان", "فصل"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={()=>setOpenModal(false)}>
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <IconButton onClick={()=>{setOpenModal(false)}}>
              <Close/>
            </IconButton>
            <img src={selectedMovie.image && selectedMovie.image.url} width={300} height={200}/>
            <Typography>عنوان فیلم: {selectedMovie.title}</Typography>
            <Typography>زبان فیلم: {selectedMovie.audioLanguage}</Typography>
            <Typography>زمان فیلم: {selectedMovie.durationInSeconds}</Typography>
          </Paper>
        </div>
      </Modal>
    </div>
  );
};

export default MoviesList;