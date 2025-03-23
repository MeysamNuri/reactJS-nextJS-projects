import React,{Component} from 'react';

class Errors extends Component {
    state = {  
        hasError:false
        
    }
    static getDerivedStateFromError(error){
        return {hasError:true}
    }
    componentDidCatch(error,errorInfo){
        // send Info to server fore store
    }
    render() { 
        if(this.state.hasEror){
                return <h1>somthing went wrong</h1>
        }
        return this.props.children
    }
}
 
export default Errors;