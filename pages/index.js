/**********************************************************************************
 *  WEB422 – Assignment 06*
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *  Name: Umar Khan Student ID: 145270211 Date: 12/07/2023
 *  Vercel App (Deployed) Link: https://web422-assignment6-next-project.vercel.app/
 * *********************************************************************************/
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
                alt="Metropolitan Museum of Art"
                fluid
                rounded
            />
            <br />
            <br />
          </Col>
          <Col md={12}>
            <p>
              The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the Americas. 
              Its permanent collection contains over two million works, divided among 17 curatorial departments.
              The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, 
              is by area one of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, 
              contains an extensive collection of art, architecture, and artifacts from medieval Europe.
            </p>
            <p>
              The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. 
              The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, 
              and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. 
              The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. 
              Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
            </p>
            <p>
              Learn more about The Met on its Wikipedia page:
              <a
                href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
                target="_blank"
                rel="noreferrer"
              >
                Wikipedia
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
