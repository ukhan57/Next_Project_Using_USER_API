
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';


export default function MainNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchField = e.target.elements.search.value;
        router.push(`/artwork?title=true&q=${searchField}`)
        setIsExpanded(false)
    };

    const handleNavToggle = (e) => {
      setIsExpanded(!isExpanded)
    }

    const handleNavLinks = () => {
      setIsExpanded(false);
    }

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary fixed-top navbar navbar-expand-lg bg-dark" data-bs-theme="dark" expanded={isExpanded}>
      <Container fluid>
        <Navbar.Brand>Umar Khan</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={handleNavToggle} />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/" passHref legacyBehavior><Nav.Link onClick={handleNavLinks}>Home</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLinks}>Advanced Search</Nav.Link></Link>
          </Nav>
          &nbsp;
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search Something"
              className="me-2"
              aria-label="search"
              name='search'
            />
            <Button type="submit" variant="outline-secondary">Search</Button>
          </Form>
          &nbsp;
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <br />
    </>
  );
}


