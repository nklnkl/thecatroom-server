import * as http from 'http';
import * as debug from 'debug';
import Application from './services/app';

class Server {
  private server: http.Server;
  private port: number;
  private address: Address;

  constructor (port: number) {
    Application.set('port', port);
    this.setPort(port);
    this.server = http.createServer(Application);
    this.address = this.server.address();
    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  private onListening () : void {
    let bind = (typeof this.address === 'string') ? `pipe ${this.address}` : `port ${this.address.port}`;
    debug(`Listening on ${bind}`);
  }

  private onError (error: NodeJS.ErrnoException) : void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private setPort (port : number) : number {
    this.port = port;
    return this.port;
  }
}

class Address {
  public port: number;
  public family: string;
  public address: string;
}

let server: Server = new Server(process.env.PORT || 3000);
