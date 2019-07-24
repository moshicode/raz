import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import moment from 'moment'

import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';





class ShiftForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: props.selectedTempClient,
            date: moment().format("YYYY-MM-DD"),
            startTime: '',
            endTime: '',
            mintuesCalcTime: '',
            note: ''
        };
    }

    calcTime = (date, startTime, endTime) => {
        var start = `${date} ${startTime}`
        var end = `${date} ${endTime}`

        var hours = moment
            .duration(moment(end, 'YYYY-MM-DD HH:mm')
                .diff(moment(start, 'YYYY-MM-DD HH:mm'))
            ).asMinutes();

        this.setState({
            mintuesCalcTime: hours
        })
        // const diff = end.subtract(start);
        // console.log(diff.minutes()) // return hours
        // diff.minutes(); // return minutes

    }

    handleSubmit = async (event) => {
        console.log(this.props.history)
        event.preventDefault();
        await this.calcTime(this.state.date, this.state.startTime, this.state.endTime)
        // event.preventDefault();
        await this.props.handleAddShift(this.state, false);
        await this.props.history.push('/')
        // var duration = moment.duration(this.state.startTime.diff(this.state.endTime));
        // console.log(duration)
        // var hours = duration.asHours();
        // event.preventDefault();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.state.clientName === null || this.state.toDashboard) {
            return <Redirect to='/' />
        }
        return (
            <div className="shifts__form">

                <TextField
                    disabled
                    id="standard-disabled"
                    label="Client Name"
                    defaultValue={this.state.clientName}
                    margin="normal"
                />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="mui-pickers-date"
                        label="Date picker"
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="mui-pickers-time"
                        label="Start Time"
                        value={this.state.startTime}
                        onChange={this.handleInputChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="mui-pickers-time"
                        label="End Time"
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    name="note"
                    id="standard-name"
                    label="Note"
                    value={this.state.note}
                    onChange={this.handleInputChange}
                    margin="normal"
                />

                <label>
                    Client:
                    <select name="clientName" value={this.state.clientName || ''} onChange={this.handleInputChange}>
                        {this.props.clients.map(client =>
                            <option key={client.id} value={client.name}>{client.name}</option>
                        )}
                    </select>
                </label>
                <label>
                    Date:
          <input
                        name="date"
                        type="date"
                        value={this.state.date}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Start Time:
          <input
                        name="startTime"
                        type="time"
                        value={this.state.startTime}
                        onChange={this.handleInputChange}
                        required />
                </label>
                <label>
                    End Time:
          <input
                        name="endTime"
                        type="time"
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        required="required" />
                </label>
                <label>
                    Note:
          <input
                        name="note"
                        type="text"
                        value={this.state.note}
                        onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </div>
        )
    }
}

export default withRouter(ShiftForm)