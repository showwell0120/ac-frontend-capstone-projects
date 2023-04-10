import classNames from 'classnames';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import { redirectToAuthCodeFlow } from '@spotify-podcast-player-frontend/spotify-api';

import { flexColCenter } from '../../bootstrap-shortcuts';
import styles from './login.module.scss';

const features = [
  {
    title: '鼓舞人心的故事',
    description: '從非凡的人生故事和成功經歷中獲得靈感',
    bgColor: '#23262F',
  },
  {
    title: '輕鬆分類與管理',
    description: '一目了然的分類，讓收藏的 Podcast 保持整潔',
    bgColor: '#2D3831',
  },
  {
    title: 'Spotify 快速同步',
    description: '透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽',
    bgColor: '#063540',
  },
];

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <Row className="vh-100">
      <Col className={classNames(flexColCenter, styles['left-col'])}>
        <div className={classNames(flexColCenter, styles['logo'])}>
          <img
            className="d-block w-50 mb-6"
            src="./images/logo.png"
            alt="logo"
          />
          <p className={styles['slogan']}>Connecting Stories That Matter</p>
        </div>
        <div className={classNames(flexColCenter, styles['login'])}>
          <Button
            onClick={redirectToAuthCodeFlow}
            variant="spotify"
            size="lg"
            className={styles['button']}
          >
            使用 SPOTIFY 帳號登入
          </Button>
          <div className={styles['signup']}>
            <span>沒有帳號嗎？</span>
            <span>
              {/* @reference: https://pjchender.dev/internet/is-noreferrer-noopenner/ */}
              <a
                target="_blank"
                href="https://www.spotify.com/us/signup"
                rel="noreferrer noopenner"
              >
                註冊帳號
              </a>
            </span>
          </div>
        </div>
      </Col>
      <Col className={styles['right-col']}>
        <Carousel className="vh-100">
          {features.map((feature, index) => (
            <Carousel.Item
              key={`feature-${index}`}
              className="vh-100"
              style={{ backgroundColor: feature.bgColor }}
            >
              <div
                className="position-absolute d-flex justify-content-center align-items-center w-100"
                style={{
                  top: 0,
                  bottom: 0,
                }}
              >
                <img
                  className="w-50 position-absolute"
                  src={`./images/app-feature-${index + 1}.png`}
                  alt={feature.title}
                  style={{ filter: 'blur(41.8502px)', borderRadius: 24 }}
                />
                <img
                  className="w-50 position-absolute"
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
    </Row>
  );
}

export default Login;
