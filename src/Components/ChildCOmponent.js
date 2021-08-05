import React from 'react'
import PropTypes from 'prop-types'

function ChildCOmponent(props) {
    return (
        <div>
            <button onClick={() => props.greetHanldler('child')}> Click</button>
        </div>
    )
}



export default ChildCOmponent

