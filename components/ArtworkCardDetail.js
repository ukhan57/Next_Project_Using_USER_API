import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json()); 
export default function ArtworkCardDetail({objectID}){
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if(error){
        return <Error statusCode={500} />;
    }

    if(!data){
        return null;
    }

    const cardImg = data.primaryImage;
    const cardTitle = data.title || "N/A";
    const objectDate = data.objectDate || "N/A";
    const classification = data.classification || "N/A";
    const medium = data.medium || "N/A";
    const artistDisplayName = data.artistDisplayName || "N/A";
    const creditline = data.creditline || "N/A";
    const dimensions = data.dimensions || "N/A";
    const artistWikiData_URL = data.artistWikiData_URL;

    return (
        <>
        <Card>
            {cardImg && <Card.Img src={cardImg} alt={cardTitle} />}
            <Card.Body>
                <Card.Title>
                    {cardTitle}
                </Card.Title>
                <Card.Text>
                    {`${objectDate}, ${classification}, ${medium}`}
                    <br />
                    <br />
                    {`Artist: ${artistDisplayName}`}
                    {artistWikiData_URL && (
                        <a href={artistWikiData_URL} target="_blank" rel="noreferrer">
                            Wiki
                        </a>
                    )}
                    <br />
                    {`Credit Line: ${creditline}`}
                    <br />
                    {`Dimensions: ${dimensions}`}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    );
};