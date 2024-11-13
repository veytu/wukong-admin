import type { Request, Response } from 'express';

const classroomData = Array.from({ length: 52 }, (_, index) => ({
    id: index.toString(),
    name: `岗前教学培训 ${index + 1}`,
    type: '一对一',
    size: '320*240',
    duration: '15分钟',
    code: `80007880${index}`,
    onlineUsers: Math.floor(Math.random() * 10),
    startTime: '2025-01-23 08:00:00',
    endTime: '2025-01-23 10:00:00',
}));

function getClassRoomData(req: Request, res: Response) {
    const result = {
        data: {
            classroomData
        },
    };
    return res.json(result);
}

export default {
    'GET  /api/monitor/list': getClassRoomData,
};
