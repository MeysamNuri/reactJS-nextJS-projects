import React from 'react'
import { Input, Button} from 'antd';
import { setFixPoz, setPortablePoz } from '../../Actions/FormAction'
import { connect } from "react-redux";

function PozInput({ FormReducer, setFixPoz, setPortablePoz }) {

   function incFix(){
      if(FormReducer.fixPoz < 5 ){
         setFixPoz(FormReducer.fixPoz + 1)
      }
   }
   function decFix(){
      if(FormReducer.fixPoz > 0){
         setFixPoz(FormReducer.fixPoz - 1)
      }
   }
   function incPortable(){
      if(FormReducer.portablePoz < 5 ){
         setPortablePoz(FormReducer.portablePoz + 1)
      }
   }
   function decPortable(){
      if(FormReducer.portablePoz > 0){
         setPortablePoz(FormReducer.portablePoz - 1 )
      }
   }
   return (
      <div className='poz-input'>
         <label htmlFor="fix" className='poz-input-lable'>
            ثابت
            <Button  type="primary" style={{marginRight:'10px'}} onClick={incFix}>+</Button>
            <Input style={{margin:'0 8px'}} type="text" value={FormReducer.fixPoz} onChange={(e)=> setFixPoz(e.target.value)}/>
            <Button type="primary" onClick={decFix}>-</Button>
         </label>
         <label htmlFor="fix" className='poz-input-lable'>
            سیار
            <Button  type="primary" style={{marginRight:'8px'}} onClick={incPortable}>+</Button>
            <Input style={{margin:'0 8px'}} type="text" value={FormReducer.portablePoz} onChange={e=> setPortablePoz(e.target.value)} />
            <Button type="primary" onClick={decPortable}>-</Button>
         </label>
      </div>
   )
}

const mapStateToProps = store => ({
   FormReducer: store.FormReducer
 });
 
 const mapDispatchToProps = dispatch => ({
   setFixPoz: fix => dispatch(setFixPoz(fix)),
   setPortablePoz: portable => dispatch(setPortablePoz(portable))
 });
export default connect(mapStateToProps, mapDispatchToProps)(PozInput)
