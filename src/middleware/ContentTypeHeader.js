'use strict';

import config from 'config';

/**
 * Middleware to send JSON API supported Content-Type header.
 *
 * @see http://jsonapi.org/format/#content-negotiation-servers
 *
 * @export default {Function}
 */
export default (req, res, next) => {

  // Exclude documentation requests.
  if (process.env.NODE_ENV === undefined && /^\/doc/.test(req.path)) {
    return next();
  }

  // Skip headers on empty response.
  let send = res.send;
  res.send = function(body) {
    if (config.get('server.allowEmptyBody') === false || body) {
      res.set('Content-Type', 'application/vnd.api+json');
    }
    send.call(this, body);
  };

  next();
};
