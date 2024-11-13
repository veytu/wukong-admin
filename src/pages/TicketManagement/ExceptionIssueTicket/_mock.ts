

import type { Request, Response } from 'express';

const mockExceptionData: ExceptionMockData[] = Array.from({ length: 73 }, (_, index) => ({
    issueType: Math.random() > 0.5 ? '网络问题' : '音频问题',     // 随机生成异常问题类型
    status: ['未处理', '处理中', '已解决'][Math.floor(Math.random() * 3)],  // 随机生成处理状态
    issueDescription: `这是一个关于${Math.random() > 0.5 ? '网络' : '音频'}的问题，影响正常使用。`, // 异常问题描述
    submissionTime: `2025-01-23 ${8 + index}:00:00`,      // 固定提交时间，时间随着 index 增加
    submitter: ['张三', '李四', '王五'][index % 3],         // 提交人（从姓名数组中选择）
    anchorInfo: `主播${['A', 'B', 'C'][index % 3]}，年龄${Math.floor(Math.random() * 10 + 20)}，性别${['男', '女'][Math.floor(Math.random() * 2)]}`, // 随机生成主播信息
    audienceInfo: `观众${['A', 'B', 'C'][index % 3]}，年龄${Math.floor(Math.random() * 10 + 20)}，性别${['男', '女'][Math.floor(Math.random() * 2)]}`, // 随机生成观众信息
    classroomInfo: `教室${index + 1}，类型：${Math.random() > 0.5 ? '一对一' : '小班'}`,  // 随机生成教室信息
    image: `https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png`,  // 模拟图片URL
    handler: ['赵六', '孙七', '周八'][index % 3],        // 处理人（从姓名数组中选择）
    remarks: Math.random() > 0.5 ? '无其他问题' : '需要进一步跟进', // 备注
    classroomId: (1000 + index).toString(),
    timeRange: `2025-01-23 ${8 + index}:00:00`
}));

function getException(req: Request, res: Response) {
    const result = {
        data: mockExceptionData,
        total: 73,
        success: true,
        pageSize: 20,
        current: 1,
    };
    return res.json(result);
}

export default {
    'GET  /api/exception/list': getException,
};
