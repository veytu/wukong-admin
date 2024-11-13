
import type { Request, Response } from 'express';

const mockRecordingData: PlaybackListMockData[] = Array.from({ length: 73 }, (_, index) => ({
    classroomId: (1000 + index).toString(),              // 生成教室号：1000, 1001, ...
    classroomName: `Classroom ${index + 1}`,             // 教室名称：Classroom 1, Classroom 2, ...
    recordingType: Math.random() > 0.5 ? '全程录制' : '部分录制',  // 随机选择录制类型
    createdAt: `2025-01-23 ${8 + index}:00:00`,         // 固定创建时间，时间随着 index 增加
    fileSize: `${(Math.random() * 2 + 1).toFixed(2)}GB`, // 随机生成文件大小（1-3GB之间）
    duration: `${Math.floor(Math.random() * 2 + 1)}小时 ${Math.floor(Math.random() * 60)}分钟`, // 随机生成时长
}));
function getPlaybackList(req: Request, res: Response) {
    const result = {
        data: mockRecordingData,
        total: 73,
        success: true,
        pageSize: 20,
        current: 1,
    };
    return res.json(result);
}

export default {
    'GET  /api/playbacklist/list': getPlaybackList,
};
