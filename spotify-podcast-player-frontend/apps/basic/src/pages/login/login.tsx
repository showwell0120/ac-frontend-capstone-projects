import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import { redirectToAuthCodeFlow } from '@spotify-podcast-player-frontend/spotify-api';

import styles from './login.module.scss';

const features = [
  {
    title: 'First slide label',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum',
  },
  {
    title: 'Second slide label',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Third slide label',
    description:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
  },
];

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <Row className="vh-100">
      <Col sm={7}>
        <Carousel className="vh-100 bg-dark">
          {features.map((feature, index) => (
            <Carousel.Item key={`feature-${index}`} className="vh-100">
              <div
                className="position-absolute d-flex justify-content-center align-items-center w-100"
                style={{ top: 0, bottom: 0 }}
              >
                <img
                  className="w-50"
                  src={`./images/app-feature-${index + 1}.png`}
                  alt={feature.title}
                />
              </div>
              <Carousel.Caption>
                <h3>{feature.title}</h3>
                <p>{feature.description} </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col
        sm={5}
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ gap: '1.5rem' }}
      >
        <img className="d-block w-50 mb-6" src="./images/logo.png" alt="logo" />
        <h2>AC Spotify Podcast Player</h2>
        <Button onClick={redirectToAuthCodeFlow} variant="success" size="lg">
          Login with Spotify
        </Button>
      </Col>
    </Row>
  );
}

export default Login;
