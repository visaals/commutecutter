import React from "react"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import CardDeck from "react-bootstrap/CardDeck"


const CommuteView = (props) => {

    let renderedTickets = props.tickets.map(ticket => {
        
        let totalCommuteTimeString = ticket[ticket.length-1][0]
        let source = ticket[ticket.length-1][1]

        ticket.pop()

        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{source}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{totalCommuteTimeString}</Card.Subtitle>
                        <ListGroup className="list-group-flush">
                            {ticket.map(elem => {
                                return (
                                    <ListGroupItem>{elem.map(e => <div>{e}<br /></div>)}</ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Card.Body>
                </Card>

            </div>
        )
    })

    return (
        <div>
            <div>
                <CardDeck>
                    {renderedTickets}
                </CardDeck>
            </div>
        </div>
    )
    


}

export default CommuteView;
