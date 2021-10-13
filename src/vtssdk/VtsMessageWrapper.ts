let vtsRequestId = 0;

export default class VtsMessageWrapper<T> {
    apiName = "VTubeStudioPublicAPI";
    apiVersion = "1.0";
    timestamp = new Date().getTime();
    messageType: string;
    requestID: string;
    data: T;


    constructor(messageType: string, data: T) {
        this.messageType = messageType;
        this.data = data;
        this.requestID = `${vtsRequestId}`;
        vtsRequestId += 1;
    }
}