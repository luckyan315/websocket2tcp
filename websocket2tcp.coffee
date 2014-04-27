# 
#  a proxy server for pipe incoming(req)/outging(res) msg between websocket to tcp
# 
#  Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)

path = require('path')
url = require('url')
fs = require('fs')
net = require('net')
http = require('http')
ws = require('ws')

# Constructor
WebSocketServer = ws.Server
# instance of ws server
wsServer = null

getPort = (addr) ->
  throw new Error 'need to input uri!' if not addr
  addr.split(':')[1]

# handle http request
handleRequest = (req, res, next) ->
  filename = path.join static_path, url.parse(req.url).pathname
  log "-----filename: #{filename}"
  fs.exists filename, (exists) ->
    return http_error res, 404, '404 Not Found' if not exists
    
    fs.readFile filename, 'binary', (err, file) ->
      return http_error res, 500, err.toString() if err

      res.writeHead 200
      res.write file, 'binary'
      res.end()


argv = require('optimist').usage('Usage: $0 -s [source_addr] -t [target_addr] -p [static_dir').argv

source_addr = argv.s ? '127.0.0.1:6080'
target_addr = argv.t ? '127.0.0.1:9999'

source_addr_port = getPort(source_addr)
target_addr_port = getPort(target_addr)
static_path = path.join __dirname, (argv.p ? './')

http = require('http')
ws = require('ws')
WebSocketServer = ws.Server

wsServer = null
isDebugMode = true

# create web server
webServer = http.createServer handleRequest
webServer.listen source_addr_port, () ->
  log "Websocket2TCP Proxy listen on localhost: #{source_addr_port} remote: #{target_addr}"
  wsServer = new WebSocketServer(
    server : webServer
    handleProtocols : selectProtocol
    )
  wsServer.on 'connection', handleConnection

# util funcs
log = () ->
  prefix = "\x1b[32m[debug] \x1b[m"
  Array::unshift.call arguments, prefix
  console.log.apply(console, arguments) if isDebugMode


getIp = (uri) ->
  throw new Error 'need to input uri!' if not uri
  uri.split(':')[0]


http_error = (res, status_code, msg) ->
  res.writeHead status_code, content-type : 'text/plain'
  res.end msg

selectProtocol = (protocols, callback) ->
  if protocols.indexOf('binary') >= 0
    callback true, 'binary'
  else if protocols.indexOf('base64') >= 0
    callback true, 'base64'
  else 
    log "Client must support 'binary' or 'base64' protocol"
    callback false



# handle websocket connection
handleConnection = (client) ->
  log "a new client is connected #{source_addr_port}, #{getIp(target_addr)}"
  log "Version: #{client.protocolVersion} Protocol: #{client.protocol}"
  remote = net.createConnection target_addr_port, getIp(target_addr), ->
    log("Remote TCP Server (#{target_addr}) is connected!");

  remote.on 'data', (data) ->
    log "[Remote --> Proxy] [#{client.protocol}] #{data}"
    if client.protocol is 'base64'
      client.send(new Buffer(data).toString('base64'))
    else
      client.send(data, binary : true)

  remote.on 'error', (err) ->
    log "[Remote connection error] #{err}"
    remote.end()
    client.close()

  remote.on 'end', ->
    log 'Remote TCP Server disconnected!'

  client.on 'message', (msg) ->
    log "[Client --> Proxy] [#{client.protocol}] #{msg}"
    if client.protocol is 'base64'
      remote.write(new Buffer(msg, 'base64'))
    else
      remote.write(msg, 'binary')

  client.on 'close', (status_code, reason) ->
    log "Client disconnected! [#{status_code}] #{reason}"
    remote.end()

  client.on 'error', (err) ->
    log "[client connection occur error:] #{err}"
    remote.end();

