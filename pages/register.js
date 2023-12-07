import { Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useState } from 'react';
import { useRouter } from "next/router";

import { registerUser } from "@/lib/authenticate";


export default function Register(props){

    const [warning, setWarning] = useState("");
    const router = useRouter();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`TODO: Submit Form with: ${user} / ${password}`)
        try {
            await registerUser(user, password, password2);
            router.push("/login");
        } catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <>
        <Card bg="light">
            <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    User Name:
                </Form.Label>
                <InputGroup hasValidation>
                    <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a user name.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>
                    Password:
                </Form.Label>
                <InputGroup hasValidation>
                    <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} required />
                </InputGroup>
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>
                    Confirm Password:
                </Form.Label>
                <InputGroup hasValidation>
                    <Form.Control type="password" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} required/>
                </InputGroup>
            </Form.Group>

            {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}

            <br />
            <Button variant="outline-dark" className="pull-right" type="submit">Register</Button>
        </Form>
        </>
    );
}