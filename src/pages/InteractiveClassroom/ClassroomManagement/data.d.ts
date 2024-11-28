
declare namespace ClassroomManagement {
    interface JoinPasswordEntry {
        joinUrl: string | null;
        role: number;
        password: string;
        roleDesc: string;
    }

    interface JoinPassword {
        [key: string]: JoinPasswordEntry;
    }

    type ConfigInfo = {
        videoResolutionConfig: number;
        videoFramerateConfig: number;
        videoKbpsConfigId: number;
        joinPassword: JoinPassword;
        roomLogoPath: string;
        autoOpenAudio: string;
        autoOpenVideo: string;
        watermarkOpen: string;
        watermarkPosition: string;
        watermarkPath: string;
        watermarkOpacity: string;
        extendData: string;
        delayTime: number;
        fromRequestInfo: string;
    };
    interface ClassroomManagementMockData {
        mainId: string;
        roomId: string;
        roomName: string;
        roomType: number;
        roomTypeName: string;
        roomStatus: number;
        roomNumber: string;
        startTime: number;//最早开始
        endStartTime: number,//最晚开始
        endTime: number;//结束
        usePlatformRoomId?: string;
        fromPlatformRoomId?: string;
        delayTime?: number;
        imDefaultGroupId?: string;
        imHelpGroupId?: string;
        language?: string;
        currentInPeopleCount?: number;
        configInfo?: ConfigInfo;
    }

    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type DataList = {
        data: ClassroomManagementMockData[];
        success: boolean;
        message?: string,
        total?: number;
    };

    type addClassRoom = {
        roomName: string,
        startTime: number,
        endTime: number,
        roomType: number,
        teacherCode?: string,
        assistantCode?: string,
        patrolCode?: string,
        studentCode?: string,
        auditorCode?: string,
        selectEndTime?: string,
        afterTime?: number,
        joinPassword?: object
    }
    interface ClassroomInfo {
        name: string;
        type: string;
        template: string;
        templateImage: string;
        startDate: string;
        endDate: string;
        commands: {
            teacher: number;
            assistant: number;
            patrol: number;
            student: string;
            listener: number;
        };
    }
}





