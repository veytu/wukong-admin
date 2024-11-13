interface ClassroomManagementMockData {
    status: number;          // 教室状态（如：'开放', '关闭'）
    classroomId: string;     // 教室号（例如：'1001'）
    classroomName: string;   // 教室名称（例如：'Classroom 1'）
    earliestStartTime: string;  // 最早开始时间（格式：'YYYY-MM-DD HH:MM:SS'）
    latestStartTime: string;    // 最晚开始时间（格式：'YYYY-MM-DD HH:MM:SS'）
    classroomType: string;    // 教室类型（例如：'一对一', '小班', '大班'）
}
type PageParams = {
    current?: number;
    pageSize?: number;
};