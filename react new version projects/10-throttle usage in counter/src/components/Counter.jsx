import PropTypes from 'prop-types';

const Counter = ({inc, dec, rest, count}) => {
    return (
        <div>
            <h1 style={{color: count === 0 ? 'red' : 'green'}} >{count}</h1>
            {/*<h1 style={count === 0 ? {color: 'red'} : {color: 'green'}}>{count}</h1>*/}

            <button onClick={inc}>+</button>
            <button style={{backgroundColor: count === 0 ? 'red' : 'teal'}} onClick={dec} disabled={count === 0}>-</button>
            <br/>
            <button onClick={rest}>💥</button>
        </div>
    )
}

Counter.propTypes = {
    inc: PropTypes.func,
    dec: PropTypes.func,
    rest: PropTypes.func,
    count: PropTypes.number
}

export default Counter;