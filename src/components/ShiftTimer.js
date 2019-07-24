import React, { Component } from 'react'
import ShiftStopwatch from '../components/ShiftStopwatch'

class ShiftTimer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <p>{this.props.runningTime}ms</p>
                <button>Start</button>
                <button>Reset</button>
                <ShiftStopwatch />
            </div>
        )
    }
}

export default ShiftTimer