import SocketServer
import struct
import pickle

class LogRecordStreamHandler(SocketServer.StreamRequestHandler):
    
    def handle(self):
        while True:
            chunk = self.connection.recv(4)
            if len(chunk) < 4:
                break
            slen = struct.unpack('>L', chunk)[0]
            chunk = self.connection.recv(slen)
            while len(chunk) < slen:
                chunk = chunk + self.connection.recv(slen - len(chunk))
            obj = pickle.loads(chunk)
            print(obj)

class LogRecordSocketReceiver(SocketServer.ThreadingTCPServer):
    allow_reuse_address = True

    # def __init__(self, host='localhost',
    #              port=logging.handlers.DEFAULT_TCP_LOGGING_PORT,
    #              handler=LogRecordStreamHandler):
    def __init__(self, host='localhost',
                 port=7777,
                 handler=LogRecordStreamHandler):
        SocketServer.ThreadingTCPServer.__init__(self, (host, port), handler)
        self.abort = 0
        self.timeout = 1
        self.logname = None

    def serve_until_stopped(self):
        import select
        abort = 0
        while not abort:
            rd, wr, ex = select.select([self.socket.fileno()],
                                       [], [],
                                       self.timeout)
            if rd:
                self.handle_request()
            abort = self.abort

def main():
    tcpserver = LogRecordSocketReceiver()
    print('About to start TCP server...')
    tcpserver.serve_until_stopped()

if __name__ == '__main__':
    main()