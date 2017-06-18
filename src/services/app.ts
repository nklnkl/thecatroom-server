import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as logger from 'morgan';

class Application {
  public express: express.Application;

  constructor () {
    this.express = express();
    this.services();
    this.routes();
  }

  private services () : void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes () : void {
    this.express.get('/', (req, res) => {
      console.log('request from ' + req.ip);
      res.end('hi');
    });
  }
}

export default new Application().express;
