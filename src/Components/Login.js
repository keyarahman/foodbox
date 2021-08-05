import React, { Component } from 'react'

export class Login extends Component {

    constructor(){
        super()
        this.state={
            isLogin: true
        }
    }
    render() {
        return this.state.isLogin ?(
            <div>
               welcome keya 
            </div>
        ):
        (
            <div>
               welcome guest 
            </div>
        )

    }
}

export default Login
