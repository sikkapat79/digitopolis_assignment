# Digitopolis NodeJS Game Server Test

ให้ใช้ Library dgt-net https://github.com/0angelic0/dgt-net สร้าง 3 โปรเจค

1. Client
2. LoadBalancer
3. Compute

## Runtime Processes

1. Client = 1 Process
2. LoadBalancer = 1 Process
3. Compute = 2 or more Processes

## Connections

<pre>
             |              | <---> Compute
Client <---> | LoadBalancer | <---> Compute
             |              | <---> Compute
</pre>

## Flow เป้าหมาย

**Client** ทำการ Connect ไปที่ LoadBalancer และทำการส่ง 

PacketID `CS_ADD_REQUEST` parameters:
x: uint16
y: uint16

ไปที่ LoadBalancer ทุกๆ 3 วินาที โดย x และ y จะเป็นเลข Random ค่าอยู่ในช่วง 0 - 65534

> console.log ค่า x และ y ทุกครั้งที่ส่งไปที่ LoadBalancer

**LoadBalancer** เมื่อได้รับ PacketID `CS_ADD_REQUEST` จาก Client แล้วจะทำการ Forward Packet ไปให้ Compute Process ทำการคำนวณให้ โดยจะเลือกส่งให้กับ Compute ในแบบ Round-Robin

**Compute** เมื่อได้รับ PacketID `CS_ADD_REQUEST` จาก LoadBalancer แล้วจะทำการคำนวณโดยเอา `x + y` ได้เป็น `result` และส่ง

PacketID `SC_ADD_RESPONSE` parameters:
result: uint32

กลับไปให้ LoadBalancer

> console.log ค่า x, y และ result ทุกครั้งที่ได้รับ Request ก่อนจะ Response

**LoadBalancer** เมื่อได้รับ PacketID `SC_ADD_RESPONSE` จาก Compute แล้วจะทำการ Forward Packet ไปให้ Client

**Client** เมื่อได้รับ PacketID `SC_ADD_RESPONSE` จาก LoadBalancer แล้ว ให้

> console.log ค่า result ที่ได้รับ

## ลำดับการเปิด Process

1. LoadBalancer
* ทำการ Listen สำหรับให้ Client มา Connect ที่ Port 8000
* ทำการ Listen สำหรับให้ Compute มา Connect ที่ Port 8001

2. Compute (2 or more)
* ทำการ Connect ไปที่ LoadBalancer Port 8001

3. Client
* ทำการ Connect ไปที่ LoadBalancer Port 8000
* เมื่อ Connected แล้ว เริ่มยิง PacketID `CS_ADD_REQUEST` ทุก 3 วินาที
