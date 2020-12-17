import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

const EditBook = (props) => {

  const [book,setBook]=useState({});

  useEffect(() => {
    setBook(props.location.state || {})
  }, []);


  const onBackPressed=()=>{
    props.history.push("/app/bookList");
    toast.success("با موفقیت ویرایش شد");
  }
  const setBookProperty =(key,e)=>{
    switch (key) {
      case "name":
        setBook({...book , name : e.target.value})
        break;
      case "price":
        setBook({...book , price : e.target.value})
        break;
      case "publisher":
        setBook({...book , publisher : e.target.value})
        break;
      case "author":
        setBook({...book , author : e.target.value})
        break;
    }
  }
  return (
    <div>
      <PageTitle title="ویرایش کتاب"/>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <TextField placeholder={"نام کتاب"} value={book.name} onChange={e=>{setBookProperty('name',e)}}/>
        </Grid>
        <Grid item>
          <TextField placeholder={"قیمت کتاب"} type={"number"} value={book.price} onChange={e=>{setBookProperty('price',e)}}/>
        </Grid>
        <Grid item>
          <TextField placeholder={"ناشر"} value={book.publisher} onChange={e=>{setBookProperty('publisher',e)}}/>
        </Grid>
        <Grid item>
          <TextField placeholder={"نویسنده"} value={book.author} onChange={e=>{setBookProperty('author',e)}}/>
        </Grid>
        <Grid item>
          <Button variant={"contained"} onClick={onBackPressed}>ذخیره</Button>
          <Button variant={"contained"} onClick={onBackPressed}>لغو</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditBook;