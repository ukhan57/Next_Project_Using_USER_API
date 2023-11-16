import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json()); 
export default function ArtworkCard({objectID}){
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if(error){
        return <Error statusCode={500} />;
    }

    if(!data){
        return null;
    }

    const cardImg = data.primaryImageSmall || `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`;
    const cardTitle = data.title || "N/A";
    const objectDate = data.objectDate || "N/A";
    const classification = data.classification || "N/A";
    const medium = data.medium || "N/A";

    return (
        <>
        <Card>
            <Card.Img src={cardImg} alt={cardTitle} />
            <Card.Body>
                <Card.Title>
                    {cardTitle}
                </Card.Title>
                <Card.Text>
                    {`${objectDate}, ${classification}, ${medium}`}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
                    <a className="btn btn-outline-dark">{objectID}</a>
                </Link>
            </Card.Body>
        </Card>
        </>
    );
};