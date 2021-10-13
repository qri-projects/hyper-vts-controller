
export class VtsPluginException extends Error{}

export class VtsPluginApiException extends VtsPluginException {
    errorId: number;
    message: string;


    constructor(errorId: number, message: string) {
        super(message);
        this.errorId = errorId;
        this.message = message;
    }
}

export class VtsPluginTimeoutException extends VtsPluginException {
}

export const VTBS_PLUGIN_TIMEOUT_EXCEPTION = new VtsPluginTimeoutException();