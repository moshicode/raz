import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


export default class SelectShift extends Component {

    handleRedirect = (path, type) => {
        if (type === 'timer') {
            this.props.handleAddShiftByTimer(this.props.selectedTempClient);
        }
        this.props.history.push(path)
    }

    render() {
        console.log(this.props)
        if (this.props.selectedTempClient !== null) {
            return (
                <div className="shifts">
                    <button onClick={() => this.handleRedirect('/shifts/timer', 'timer')}>
                        Start Shift Timer
                    </button>
                    <p onClick={() => this.handleRedirect('/shifts/form', 'manual')}>
                        or Add Manually
                    </p>

                </div>
            )
        } else {
            return (
                <Redirect to='/' />
            )
        }
    }
}

