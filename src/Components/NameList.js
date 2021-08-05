import React from 'react'
import PropTypes from 'prop-types'

function NameList() {
    
        
        const person=[
            {
                
                name:"keya"
            },
            {
                
                name:'Jon'
            }

        ]

        const personList =person.map(person=>(<h2>I am {person.name}</h2>))
        
    return(
        <div>
        
            {personList}
        </div>
    )
    
}



export default NameList

