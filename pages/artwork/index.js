import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Error from "next/error";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Pagination } from "react-bootstrap";
import useSWR from "swr";

const PER_PAGE = 12;
const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function Artwork(){
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);

    function previousPage(){
        if (page > 1) {
            setPage(page - 1);    
        }
    }
    
    function nextPage(){
        if (page < artworkList.length) {
            setPage(page + 1);   
        }
    }

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);

    useEffect(()=>{
        if (data) {
            const results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data])

    if (error) {
        return <Error statusCode={500} />
    }

    if (artworkList) {
        return (
            <div>
                <Row className="gy-4">
                    {artworkList.length > 0 ? (
                    artworkList[page - 1].map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                    ))
                    ) : (
                    <Col lg={3}>
                    <Card>
                        <Card.Body>
                        <h4>Nothing Here</h4>
                            Try searching for something else.
                        </Card.Body>
                    </Card>
                    </Col>
                    )}
                </Row>
                {artworkList.length > 0 && (
                <Row className="justify-content-center">
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                </Row>
                )}
            </div>
        )  
    }
    return null;
}