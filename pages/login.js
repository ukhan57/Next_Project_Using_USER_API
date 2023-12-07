import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useAtom } from "jotai";

import { authenticateUser } from "@/lib/authenticate";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";

export default function Login(props){
    const [favouriteList, setFavouriteList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const [warning, setWarning] = useState("");
    const router = useRouter();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`TODO: Submit Form with: ${user} / ${password}`)
        try {
            await authenticateUser(user, password);
            await updateAtoms();
            router.push("/favourites");
        } catch (err) {
            setWarning(err.message);
        }
    }

    async function updateAtoms(){
        setFavouriteList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    return (
        <>
        <Card bg="light">
            <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>User Name:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} required/>
            </Form.Group>
            <br />
            <Form.Group>
            <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} required/>
            </Form.Group>

            {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}

            <br />
            <Button variant="outline-dark" className="pull-right" type="submit">Login</Button>
        </Form>
        </>
    );
}
