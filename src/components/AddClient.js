import React, { Component } from 'react';

class AddClient extends Component {
    constructor() {
        super();
        this.state = { value: '' };
    }

    handleSubmit = async () => {
        await this.props.handleAddClient(this.state.value.toLowerCase());
        await this.setState({ value: '' });
    }

    handleChange = newValue => {
        this.setState({ value: newValue });
    }

    render() {
        return (<div>
            <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e.target.value)} />
            <button type="button" onClick={this.handleSubmit}>Add New Client</button>
        </div>);
    }
}

export default AddClient;
