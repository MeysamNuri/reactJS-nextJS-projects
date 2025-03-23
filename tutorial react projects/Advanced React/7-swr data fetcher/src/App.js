import React from 'react';
import useSWR from 'swr'
import axios from 'axios';
const App = () => {
  // const {data,err}=useSWR("https://localhost:3000/posts",(url)=>axios(url).then(res=>res.data))
  const {data,err}=useSWR("https://localhost:3000/posts")

  return (
<div>
  salam
  {err && <p>error hapened : {err}</p>}
  {data && <ul>{data.map((item)=><li>{item.title}</li>)}</ul>}
</div>
  );
};

export default App;