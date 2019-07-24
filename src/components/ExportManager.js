import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";

class ExportManager extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.data)

        const headers = [
            { label: "Client Name", key: "name" },
            { label: "Date", key: "date" },
            { label: "Start Time", key: "starttime" },
            { label: "End Time", key: "endtime" },
            { label: "Total Time", key: "mintuescalctime" },
            { label: "Note", key: "note" },
        ];

        return (
            <CSVLink
                data={this.props.data}
                filename={"file.csv"}
                headers={headers}>Download
            </CSVLink>
        );
    }
}

export default ExportManager