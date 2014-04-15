websocket2tcp
=============

## Usage
```script
Usage: node ./websocket2tcp.js -s [source_addr] -t [target_addr] -p [static_dir]

Options:
  -s  [required]
  -t  [required]
```

a proxy server for pipe incoming(req)/outging(res) msg between websocket to tcp 

## connect via putty + xming in win

### vnc server
```script
$/etc/ssh/sshd_config, add following content
X11Forwrding yes
```

## vnc client in win
```script
1st time to connect the vnc server use XLaunch
save the conf file, dbclick it to start xming
Putty config --> Connection --> SSH --> X11
X11 forwarding --> Enable X11 forwarding --> X display location:
The Display Number as config the Xming X server in XLaunch
REF:
http://www.zw1840.com/blog/zw1840/2008/10/putty-xming-linux-gui.html
```
## rfb protocol doc
```script
wget https://github.com/luckyan315/websocket2tcp/raw/master/doc/rfbproto.pdf
```


