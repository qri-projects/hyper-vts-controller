

export class AuthTokenReq {
    pluginName = "VtsStudioSDK";
    pluginDeveloper = "Qri<va.qri@qq.com>";
    pluginIcon : string;

    constructor(pluginName: string, pluginDeveloper: string, pluginIcon: string) {
        this.pluginName = pluginName;
        this.pluginDeveloper = pluginDeveloper;
        this.pluginIcon = pluginIcon;
    }
}

export interface AuthTokenRes {
    authenticationToken: string
}

export class AuthReq {
    "pluginName" = "VtsStudioHelper";
    "pluginDeveloper" = "Qri<va.qri@qq.com>";
    "authenticationToken": string


    constructor(pluginName: string, pluginDeveloper: string, authenticationToken: string) {
        this.pluginName = pluginName;
        this.pluginDeveloper = pluginDeveloper;
        this.authenticationToken = authenticationToken;
    }
}

export interface AuthRes {
    authenticated: boolean
    reason: string
}

export interface VtsStatistics {
    uptime: number
    framerate: number
    vTubeStudioVersion: string
    allowedPlugins: number
    connectedPlugins: number
    startedWithSteam: boolean
    windowWidth: number
    windowHeight: number
    windowIsFullscreen: boolean
}

export interface ModelInfo {
    modelLoaded: boolean
    modelName?: string
    modelID?: string
    vtsModelName?: string
    vtsModelIconName?: string
    live2DModelName?: string
    modelLoadTime?: number
    timeSinceModelLoaded?: number
    numberOfLive2DParameters?: number
    numberOfLive2DArtmeshes?: number
    hasPhysicsFile?: boolean
    numberOfTextures?: number
    textureResolution?: number
    modelPosition?: {
        "positionX": number
        "positionY": number
        "rotation": number
        "size": number
    }
}

export interface ModelBriefInfo {
    modelLoaded: boolean;

    modelName: string,
    modelID: string,
    vtsModelName: string,
    vtsModelIconName: string
}

export interface ModelsRes {
    numberOfModels: number
    availableModels: [ModelBriefInfo]
}

export interface LoadModelRes {
    modelID: string
}

export class MoveModelReq {
    timeInSeconds: number = 0.5
    valuesAreRelativeToModel: boolean = false
    positionX?: number
    positionY?: number
    rotation?: number
    size?: number
}


export interface GetHotKeysRes {
    "modelLoaded": boolean,
    "modelName": string,
    "modelID": string,
    availableHotkeys: [{
        name: string,
        "type": string,
        "file": string,
        "hotkeyID": string
    }]
}

export interface InvokeHotkeyRes {
    hotkeyID: string
}



export class InjectParamValue {
    id: string;
    value: number;
    weight?: number;


    constructor(id: string, value: number, weight?: number) {
        this.id = id;
        this.value = value;
        this.weight = weight;
    }
}

export class InjectParamReq {
    parameterValues: Array<InjectParamValue>;

    constructor(parameterValues: Array<InjectParamValue>) {
        this.parameterValues = parameterValues;
    }
}

export class CreateParamReq {
    parameterName: string;
    explanation = "new parameter by plugin";
    min = -50;
    max = 50;
    defaultValue = 10


    constructor(parameterName: string, explanation?: string, min?: number, max?: number, defaultValue?: number) {
        this.parameterName = parameterName;
        this.explanation = explanation ?? this.explanation;
        this.explanation = explanation ?? this.explanation
        this.min = min ?? this.min;
        this.max = max ?? this.max;
        this.defaultValue = defaultValue ?? this.defaultValue;
    }
}

export interface CreateParamRes {
    parameterName: string
}

export class APIS {
    static AUTH_TOKEN = "AuthenticationTokenRequest";
    static AUTH = "AuthenticationRequest";
    static INJECT_PARAM = "InjectParameterDataRequest";
    static CREATE_PARAM = "ParameterCreationRequest";
    static GET_CURRENT_STATISTICS = "StatisticsRequest"
    static GET_FOLDERS_LIST = "VTSFolderInfoRequest"
    static GET_CURRENT_LOADED_MODEL = "CurrentModelRequest"
    static GET_AVAILABLE_MODELS = "AvailableModelsRequest";
    static LOAD_MODEL = "ModelLoadRequest";
    static MOVE_MODEL = "MoveModelRequest";
    static GET_HOTKEYS = "HotkeysInCurrentModelRequest";
    static INVOKE_HOTKEY = "HotkeyTriggerRequest";
}
