const EventEmitter = require('events').EventEmitter;
const jwt = require('jsonwebtoken');
const emitter = new EventEmitter();
const { validateTokenRiderSocketio } = require('../api/middlewares/auth/authFront');
const { ObjectId } = require('mongodb');
const config = require('../config');
const VisitRouteService = require('../services/visit-route');

const riderSocketMap = {
    // [rider_id]: {
    // socket_id: "hHQrR5iBiiTliz5sAAAB"
    // location:[longitude and latitude]
    // }
}

const agencySocketMap = {
    // [agency_id]: socket_id
}

const adminSocketMap = {
    // [admin_id]: socket_id
}

module.exports = ({ server }) => {

    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    global.socketEmitter = emitter;

    io.on('connection', async (socket) => {
        console.log("SOCKET CONNECTED")

        //=====================================================================================================================================================
        try {
            let bearer = null;
            if (socket.handshake.auth.token) {
                bearer = socket.handshake.auth.token?.split(' ');
            } else if (socket.handshake.headers.authorization) {
                bearer = socket.handshake.headers.authorization?.split(' ');
            } else {
                bearer = socket.handshake.headers.token?.split(' ');
            }

            const token = bearer?.[1];

            const decode = jwt.verify(token, config.jwt.secretKey);

            if (decode.role === 'Rider') {
                riderSocketMap[decode.sub] = {};
                riderSocketMap[decode.sub].socket_id = socket.id;
                console.log("RIDER SOCKET MAP =>", riderSocketMap);
            }

            if (decode.role === 'Agency') {
                agencySocketMap[decode.sub] = {};
                agencySocketMap[decode.sub].socket_id = socket.id;
                console.log("AGENCY SOCKET MAP =>", agencySocketMap);
            }

            if (decode.role === 'Admin') {
                adminSocketMap[decode.sub] = {};
                adminSocketMap[decode.sub].socket_id = socket.id;
                console.log("ADMIN SOCKET MAP =>", adminSocketMap);
            }

        } catch (err) {
            console.log("ERROR IN SOCKET CONNECTION =>", err)
        }
        //=====================================================================================================================================================

        //=====================================================================================================================================================
        socket.on('update-location', (coordinates) => {
            try {

                console.log("coordinates =>", coordinates)

                let bearer = null;
                if (socket.handshake.auth.token) {
                    bearer = socket.handshake.auth.token?.split(' ');
                } else if (socket.handshake.headers.authorization) {
                    bearer = socket.handshake.headers.authorization?.split(' ');
                } else {
                    bearer = socket.handshake.headers.token?.split(' ');
                }
                const { sub, role } = jwt.verify(bearer[1], config.jwt.secretKey);

                if (role === 'Rider') {

                    riderSocketMap[sub].location = JSON.parse(coordinates);
                    console.log("RIDER SOCKET MAP =>", riderSocketMap);
                }
            } catch (err) {
                console.log("ERROR IN UPDATING RIDER LOCATION =>", err);
            }
        })

        //=====================================================================================================================================================
        socket.on('rider-movement', async (rowData) => {
            try {
                const data = JSON.parse(rowData)
                // console.log("RIDER MOMENT EMMITED =>", data.lat, data.long)
                const srvRes = await VisitRouteService.save(data);
                socket.to(agencySocketMap[data.agency_id]).emit(data.visit_id, srvRes.data.coordinates);
                socket.to(adminSocketMap['6756cb03ecc725551c2bee8c']).emit(data.visit_id, srvRes.data.coordinates);
                // console.log("EMMITED EVENT =>", data.visit_id);
            } catch (err) {
                console.log("ERROR WHILE SAVING RIDER MOVEMENT DATA =>", err)
            }
        });
        //=====================================================================================================================================================

        //=====================================================================================================================================================
        socket.on('rider-subscribe', async () => {
            try {
                const { __cuser } = await validateTokenRiderSocketio(socket.handshake.headers.token);
                if (__cuser && __cuser.id) {
                    socket.join(__cuser.id.toString());
                    socket.join('rider-dismiss-job-room');
                }
                // console.log(Array.from(io.sockets.adapter.rooms).filter(v => ObjectId.isValid(v[0])).map(v => v[0]))
            } catch (error) {
            }
        });
        //=====================================================================================================================================================

        emitter.removeAllListeners();
        socket.on('disconnect', (reason) => {
            // Array.from(io.sockets.adapter.rooms).filter(v => parseInt(v[0])).map(v => v[0]);
        });
    });

    io.on('error', (err) => {
        console.error('Socket.IO Error:', err);
    });

    return io;
};


module.exports.riderSocketMap = riderSocketMap;
module.exports.adminSocketMap = adminSocketMap;
module.exports.agencySocketMap = agencySocketMap;
