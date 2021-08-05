import React, { Component } from 'react'

export class welcome extends Component {


    constructor(){
        super()
        this.state={
            message:"Welcome visitor"
        }


    }

    changeMessage(){
        this.setState({
            message:"Thank you for subscribing"
        })
    }
    render() {
         return (
             <div>
                  <h1>{this.state.message}</h1>
                  <button onClick ={()=>this.changeMessage() }>Subscribe</button>
             </div>
          
        )
    }
}

export default welcome
