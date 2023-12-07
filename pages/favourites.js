import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import { Row, Col, Card, CardTitle, CardBody } from "react-bootstrap";

export default function Favourites () {
    const [favouritesList] = useAtom(favouritesAtom);

    if(!favouritesList) return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Sorry!
                </Card.Title>
                <Card.Text>
                    Try refreshing the page!
                </Card.Text>
            </Card.Body>
        </Card>
    )
    else
        return (
            <div>
                <Row className="gy-4">
                    {favouritesList && favouritesList.length > 0 ? (
                    favouritesList.map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                    ))
                    ) : (
                    <Col lg={3}>
                    <Card>
                        <Card.Body>
                        <h4>Nothing Here</h4>
                            Try adding some new artwork to the list.
                        </Card.Body>
                    </Card>
                    </Col>
                    )}
                </Row>
            </div>
        )  
    }