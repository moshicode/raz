import React, { Component } from 'react'

class ShiftStopwatch extends Component {
    state = {
        status: false,
        runningTime: 0
    };

    handleClick = () => {
        this.setState(state => {
            if (state.status) {
                clearInterval(this.timer);
            } else {
                const startTime = Date.now() - this.state.runningTime;
                this.timer = setInterval(() => {
                    this.setState({ runningTime: Date.now() - startTime });
                });
            }
            return { status: !state.status };
        });
    };

    handleReset = () => {
        this.setState({ runningTime: 0, status: false });
    };

    render() {
        const { status, runningTime } = this.state;
        return (
            <div>
                <p>{runningTime}ms</p>
                <button onClick={this.handleClick}>{status ? 'Stop' : 'Start'}</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

export default ShiftStopwatch