import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import useStyle from './styles'
const Login = () => {
    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const validation=(user)=>{
        console.log(user);
        if(!user.name){
            return alert("لطفا نام خود را وارد کنید")
        }
        else if(user.gender ==="" || user.gender===-1|| user.gender===undefined){
            return alert("لطفا جنسیت خود را مشخص کنید")
        }
        else {
            return alert("شما دیتای درستی وارد کردید")
        }
    }
    const handleSubmit = () => {
      

        console.log(name,gender);
       const errors= validation({name,gender})
       if(errors){
           return errors
       }
      

    }
    const classes = useStyle()
    return (<>
        <Grid container direction={"column"}>
            <Grid item>
                <div className={classes.header}>
                    پنل چت روم
                </div>
                <Grid container justify={"center"} className={classes.formInput} alignItems={"center"}>
                    <label style={{ marginLeft: "20px", fontSize: "20px" }}>نام و نام خانوادگی</label>
                    <TextField id="outlined-basic" variant="outlined" value={name} onChange={e => setName(e.target.value)} />

                </Grid>
                <Grid container justify={"center"} className={classes.formInput} alignItems={"center"}>
                    <Grid item>
                        <label className={classes.label}>جنسیت</label>
                    </Grid>
                    <FormControl variant="outlined">

                        <InputLabel id="demo-simple-select-outlined-label">جنسیت</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            label="gender"
                            style={{ padding: "0px 50px" }}
                        >
                            <MenuItem value={-1}>
                                <em>خالی</em>
                            </MenuItem>
                            <MenuItem value={0}>آقا</MenuItem>
                            <MenuItem value={1}>خانم</MenuItem>

                        </Select>

                    </FormControl>
                    <Grid container>

                        <Button variant="contained" color="primary" className={classes.buttons} onClick={handleSubmit}>
                            ورود به چت روم
</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    </>);
}

export default Login;