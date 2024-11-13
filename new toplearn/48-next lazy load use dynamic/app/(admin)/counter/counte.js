const Count = ({count,setCount}) => {
    return ( 
        <>
         <p>شما {count} بار کلیک کرده اید</p>
         <button onClick={() => setCount(count + 1)}>کلیک کنید</button>
        </>
     );
}
 
export default Count;