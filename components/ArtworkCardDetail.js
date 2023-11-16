
import useSWR from "swr";
import Error from "next/error";
import { Button, Card } from "react-bootstrap";

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCardDetail({objectID}){

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

    const {data, error} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher)
    // const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if(error){
        return <Error statusCode={500} />;
    }

    if(!data){
        return null;
    }

    const favouritesClicked = () => {
        if (showAdded) {
            setFavouritesList((current) => current.filter((fav) => fav != objectID));
        }
        else {
            setFavouritesList((current) => [...current, objectID]);
        }
        setShowAdded(!showAdded);
    };

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
                    <br /> <br />
                    <Button variant={showAdded ? "dark" : "outline-dark"} onClick={favouritesClicked}>
                        {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    );
};