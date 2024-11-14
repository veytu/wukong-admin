declare namespace MonitoringManagement {
    interface Classroom {
        id: string;
        name: string;
        classType: string;
        size: string;
        duration: string;
        code: string;
        onlineUsers: number;
        startTime: string;
        endTime: string;
        status: boolean
    }
    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type DataList = {
        data?: Classroom[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };

}
