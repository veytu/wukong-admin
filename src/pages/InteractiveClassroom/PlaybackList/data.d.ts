declare namespace PlaybackList {
    interface PlaybackListMockData {
        classroomId: string;       // 教室号（如：'1001'）
        classroomName: string;     // 教室名称（如：'Classroom 1'）
        recordingType: string;     // 录制类型（如：'全程录制', '部分录制'）
        createdAt: string;         // 创建时间（格式：'YYYY-MM-DD HH:MM:SS'）
        fileSize: string;          // 文件大小（如：'500MB'）
        duration: string;          // 时长（如：'1小时 30分钟'）
        classTime?: string,
        status?: number
    }
    type PageParams = {
        current?: number;
        pageSize?: number;
    };
    type DataList = {
        data?: PlaybackListMockData[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };
}
