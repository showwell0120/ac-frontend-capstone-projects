import classNames from 'classnames';
import Button from 'react-bootstrap/Button'
import { AxiosError } from 'axios';

import { flexColCenter } from '../../bootstrap-classnames';
import styles from './fallback-render.module.scss';

// 500: error page
// 401/403 prompt modal -> login page

/* eslint-disable-next-line */
export interface FallbackRenderProps {
  error: AxiosError;
}

const messageMap = {
  needAuth: "帳號認證已經超過效期，請點選下方按鈕重新登入。",
  serverError: "系統出現內部錯誤，請聯繫客服人員。"
}

export function FallbackRender({error}: FallbackRenderProps) {
  const status = error.response?.status;

  const isNeedAuth = status && status === 401 || status === 403;
  const isServerError = status && status >= 500;
  const message = isServerError
    ? messageMap.serverError
    : isNeedAuth
    ? messageMap.needAuth
    : '發生未知錯誤  🤔';

  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <p>{message}</p>
      <pre>({error.message})</pre>
      <Button
        onClick={() => {
          window.location.href = window.location.origin;
        }}
      >
        登入
      </Button>
    </div>
  );
}

export default FallbackRender;
