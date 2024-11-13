interface ExceptionMockData {
    issueType: string;          // 异常问题类型（如："网络问题", "音频问题"）
    status: string;             // 处理状态（如："未处理", "处理中", "已解决"）
    issueDescription: string;   // 异常问题描述（简短描述问题）
    submissionTime: string;     // 提交时间（格式：'YYYY-MM-DD HH:MM:SS'）
    submitter: string;          // 提交人（如：'张三'）
    anchorInfo: string;         // 主播信息（如：'主播A，年龄25，性别男'）
    audienceInfo: string;       // 观众信息（如：'观众B，年龄30，性别女'）
    classroomInfo: string;      // 教室信息（如：'教室1，类型：一对一'）
    image: string;              // 图片（URL 或 Base64 编码的图片字符串）
    handler: string;            // 处理人（如：'李四'）
    remarks: string;            // 备注（如：'无其他问题'）
    classroomId?: string,
    timeRange?: string
}
