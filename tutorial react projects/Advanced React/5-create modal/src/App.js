import React, { useState } from 'react';
import Modal from './Modal';


const App = () => {
const [openModal,setOpenModal]=useState(false)
  return (
 <>
<button onClick={e=>setOpenModal(!openModal)}>delete</button>
<Modal open={openModal} onclose={e => setOpenModal(false)}>
<h3>are you sure?</h3>
<p>this act is irreversible</p>
<button onClick={e =>setOpenModal(false)}>ok</button>

</Modal>
 </>
  );
};

export default App;