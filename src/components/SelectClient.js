import React from 'react'
import { withRouter } from 'react-router-dom'

const SelectClient = (props) => {

    const handleSelect = async (clientName) => {
        await props.setSelectedClient(clientName)
        await props.history.push('/shifts/select')
    }

    return (
        <div className="clients">
            <h3>Choose Client</h3>
            <ul className="clients__list">
                {props.clients.map((client, index) =>
                    <li key={index} onClick={() => handleSelect(client.name)}>
                        {client.name}
                    </li>
                )
                }
            </ul>
        </div>
    )

}
export default withRouter(SelectClient)