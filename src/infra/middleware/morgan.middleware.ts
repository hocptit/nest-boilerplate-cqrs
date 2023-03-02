// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import morgan from 'morgan';

morgan.token('user', (req) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (req?.user) return `[User: ${req?.user?.userId}]`;
  return 'Anonymous';
});

morgan.format('custom', (tokens, req, res) => {
  // tokens['remote-addr-cus'] = () => tokens['remote-addr'](req).padStart(29, ' ').substr(0, 29);
  // const frm = `ACCESS :date[iso] :remote-addr-cus | :user :method :url :status - :response-time ms`;
  const frm = `:remote-addr :user :method :url :status - :response-time ms`;
  const fn = morgan.compile(frm);
  return fn(tokens, req, res);
});

export function useMorgan(logger?: any) {
  if (!logger) return morgan('custom');
  return morgan('custom', {
    stream: logger,
  });
}
