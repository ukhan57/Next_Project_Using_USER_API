import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';

import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';


export default function MainNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter();

    let token = readToken();

    async function handleSubmit(e) {
        e.preventDefault();
        const searchField = e.target.elements.search.value;
        router.push(`/artwork?title=true&q=${searchField}`)
        setIsExpanded(false)

        setSearchHistory(await addToHistory(`title=ture&q=${searchField}`));
    };

    const handleNavToggle = (e) => {
      setIsExpanded(!isExpanded)
    }

    const handleNavLinks = () => {
      setIsExpanded(false);
    }

    const handleDropToggle = (e) => {
      setIsExpanded(!isExpanded)
    }

    const logOut = () => {
      setIsExpanded(false);
      removeToken();
      router.push('/login');
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
            <Link href="/" passHref legacyBehavior><Nav.Link onClick={handleNavLinks} active={router.pathname === "/"}>Home</Nav.Link></Link>
            {token && <Link href="/search" passHref legacyBehavior><Nav.Link onClick={handleNavLinks} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
          </Nav>
          &nbsp;
          {!token && <Nav>
            <Link href="/register" passHref legacyBehavior><Nav.Link onClick={handleNavLinks}>Register User</Nav.Link></Link>
            <Link href="/login" passHref legacyBehavior><Nav.Link onClick={handleNavLinks}>Login</Nav.Link></Link>
          </Nav>}
          &nbsp;
          {token && <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search Something"
              className="me-2"
              aria-label="search"
              name='search'
            />
            <Button type="submit" variant="outline-secondary">Search</Button>
          </Form>}
          &nbsp;
          <Nav>
           {token && <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {token && <> {token.userName}</>}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link href="/favourites" passHref legacyBehavior><Dropdown.Item onClick={handleDropToggle}>Favourites</Dropdown.Item></Link>
                <Link href="/history" passHref legacyBehavior><Dropdown.Item onClick={handleDropToggle}>Search History</Dropdown.Item></Link>
                <Link href="/login" passHref legacyBehavior><Dropdown.Item onClick={logOut} >Log Out</Dropdown.Item></Link>
              </Dropdown.Menu>
            </Dropdown>}
          </Nav>
          &nbsp;
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <br />
    </>
  );
}


