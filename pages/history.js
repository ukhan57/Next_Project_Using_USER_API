import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ListGroup, Card, Button} from "react-bootstrap";
import styles from "@/styles/History.module.css";

import { removeFromHistory } from "@/lib/userData";

export default function History () {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        // const clickedHistory = searchHistory[index];
        router.push(`artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked (e, index) {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }
    
    if (!parsedHistory || parsedHistory.length === 0) {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                            Try searching for some artwork.
                    </Card.Body>
                </Card>
            </div>
        );
    } else {
        return (
            <ListGroup>
              {parsedHistory.map ((historyItem, index) => (
                <ListGroup.Item key={index} className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
                    {Object.keys(historyItem).map((key) => (
                        <>
                            {key}: <strong>{historyItem[key]}</strong>&nbsp;
                        </>
                    ))}
                    <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>
                        &times;
                    </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
        );
    }
}