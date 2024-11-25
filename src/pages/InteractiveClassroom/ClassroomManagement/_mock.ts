
import type { Request, Response } from 'express';

const classroomManagementData: ClassroomManagement.ClassroomManagementMockData[] = Array.from({ length: 73 }, (_, index) => ({
    mainId: '1',
    roomType: 2,
    roomStatus: Math.floor(Math.random() * 10) % 4,  // 随机生成开放或关闭状态
    roomId: (1000 + index).toString(),        // 生成教室号：1000, 1001, ...
    roomName: `Classroom ${index + 1}`,       // 教室名称：Classroom 1, Classroom 2, ...
    startTime: `2025-01-23 08:00:00`,      // 固定最早开始时间
    endTime: `2025-01-23 10:00:00`,       // 固定最晚开始时间
    roomTypeName: Math.random() > 0.5 ? '一对一' : '小班', // 随机生成教室类型：一对一 或 小班
}));

function getClassroomManagement(req: Request, res: Response) {
    const result = {
        data: classroomManagementData,
        total: 73,
        success: true,
        pageSize: 20,
        current: 1,
    };
    return res.json(result);
}

export default {
    'GET  /api/management/list': getClassroomManagement,
};
