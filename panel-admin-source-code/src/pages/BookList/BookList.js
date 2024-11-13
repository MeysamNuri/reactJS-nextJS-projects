import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Button, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons'

const booksData = [
  {
    id:1,
    name: "کتاب اول",
    price: 20000,
    publisher: "ناشر 1",
    author: "شجاعی",
  },
  {
    id:2,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر 1",
    author: "یامین پور",
  },
  {
    id:3,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر 1",
    author: "یامین پور",
  },
  {
    id:4,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر 1",
    author: "یامین پور",
  },
  {
    id:5,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر 1",
    author: "یامین پور",
  },
  {
    id:6,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر 1",
    author: "یامین پور",
  },
  {
    id:7,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر 1",
    author: "یامین پور",
  },
];
const BookList = (props) => {

  const onEditClick=(item)=>{
    props.history.push({
      pathname : "/app/editBook",
      state : item
    })
  };
  const onDeleteClick=(item)=>{
    let foundIndex=-1;
    books.forEach((itemBook,index)=>{
      if(itemBook.id===item.id)
        foundIndex=index;
    });
    console.log(foundIndex);
    setBooks(books=>{
      return [...books.slice(0,foundIndex),...books.slice(foundIndex+1)];
    })
  };

  const transform = (data) => {
    return data.map(item => {
      return [
        item.name,
        item.price,
        item.publisher,
        item.author,
        <IconButton onClick={()=>onDeleteClick(item)}>
          <DeleteIcon/>
        </IconButton>,
        <IconButton onClick={()=>onEditClick(item)}>
          <EditIcon/>
        </IconButton>,
      ];
    });
  };

  const [books,setBooks]=useState([]);
  useEffect(()=>{
    setBooks(booksData);
  },[])

  return (
    <div>
      <PageTitle title="لیست کتاب های موجود در انبار"/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="کتاب ها"
            data={transform(books)}
            columns={["نام کتاب", "قیمت", "ناشر", "نویسنده", "حذف", 'ویرایش']}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BookList;