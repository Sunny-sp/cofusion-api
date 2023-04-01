import cors from 'cors';

const whiteList = ['http://localhost:3000','http://localhost:3001', 'https://localhost:3443', 'https://sunny-sp.github.io'];

// origin: function (origin, callback) {
//     if (whiteList.indexOf(origin) !== -1 && origin) {
//     callback(null, true)
//     } else {
//     callback(new Error('Not allowed by CORS'))
//     }
// },
export const corsOptionsDelegate = {
    origin: '*',
    allowedHeaders: ['Origin', 'Content-Type','Authorization'],
}

export const openCors = cors();
export const corsWithOptions = cors(corsOptionsDelegate);
