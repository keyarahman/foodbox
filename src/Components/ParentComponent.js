import React, { Component } from 'react'

import ChildCOmponent from './ChildCOmponent'

export class ParentComponent extends Component {


    constructor(props){
        super(props)
        this.state={
            parentName: 'parent'
        }
        this.greetParentnpm =this.greetParent.bind(this)

    }

    greetParent(childename){
        alert(`Hello ${this.state.parentName} from ${childename}`)
    }
    render() {
        return (
            <div>
                <ChildCOmponent greetHanldler={this.greetParent}/>
            </div>
        )
    }
}

export default ParentComponent
