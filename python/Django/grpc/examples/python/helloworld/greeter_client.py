# Copyright 2015 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""The Python implementation of the GRPC helloworld.Greeter client."""

from __future__ import print_function
from concurrent.futures import ThreadPoolExecutor
from time import sleep

import grpc

import helloworld_pb2
import helloworld_pb2_grpc


def run():
  channel = grpc.insecure_channel('localhost:50051')
  stub = helloworld_pb2_grpc.GreeterStub(channel)
  
  futures = []

  pool = ThreadPoolExecutor(100)

  def do_request(msg):
      response = stub.SayHello(helloworld_pb2.HelloRequest(name=msg))
      return response.message
  
  for idx in range(0, 30):
      futures.append(pool.submit(do_request, str(idx)))

  sleep(3)

  for future in futures:
      msg = future.result()
      print(msg)
        
  #response = stub.SayHello(helloworld_pb2.HelloRequest(name='you'))
  #print("[%d] Greeter client received: %s" % (n, response.message))
  



if __name__ == '__main__':
  run()
