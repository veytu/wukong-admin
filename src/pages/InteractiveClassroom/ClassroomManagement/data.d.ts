
declare namespace ClassroomManagement {

    type ConfigInfo = {
        videoResolutionConfig: number;
        videoFramerateConfig: number;
        videoKbpsConfigId: number;
        joinPassword: Record<string, any>;
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
        startTime: string;
        endTime: string;
        roomType: number;
        roomTypeName: string;
        roomStatus: number;
        roomNumber?: string;
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

    type ListItem = {
        [key]: any
    }
}





