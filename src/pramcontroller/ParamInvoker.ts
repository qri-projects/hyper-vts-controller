import { ParamChange } from "@/pramcontroller/ParamChange";
import {
  ChangeControlType,
  ParamChangeCreateReq,
  ParamInvokerData,
  ParamInvokerViewInfo
} from "@/pramcontroller/createreq/CreateReq";

// todo: 引入sdk后删除
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

export class ParamInvoker {
  name: string;
  paramInvokerViewInfo: ParamInvokerViewInfo;
  desc?: string;

  genInject2VtsReq(value: number|string|boolean): Array<InjectParamValue> {
    const injectParamValues: Array<InjectParamValue> = [];

    const apply = (paramId: string, value: number, weight?: number) => {
      injectParamValues.push(new InjectParamValue(paramId, value, weight));
    }

    this.genInject2VtsReqFromUser(apply, value);
    return injectParamValues;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  genInject2VtsReqFromUser: (apply: (paramId: string, value: number, weight?: number) => void, value: number|boolean|string) => void;


  constructor(req: ParamInvokerData) {
    this.name = req.name;
    this.desc = req.desc;
    this.paramInvokerViewInfo = req.paramInvokerViewInfo;
    if (req.changeControlType === ChangeControlType.METHOD_STRING) {
      // 赋值时是脚本字符串时, 将脚本eval赋值给genInject2VtsReqFromUser方法
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.genInject2VtsReqFromUser = (apply, value) => {
      };
      eval("this.genInject2VtsReqFromUser = (apply, value) => " + req.genApplyValueCommandString!);
    } else {
      // 赋值时是用户页面创建的view组件, 目前没有用到
      const reqs: Array<ParamChangeCreateReq> = req.paramChangeCreateReqs!;
      const paramChanges: Array<ParamChange> = reqs.map(
        (r) => new ParamChange(r)
      );
      this.genInject2VtsReqFromUser = (apply, value) => {
        paramChanges.forEach((paramChange) => {
          apply(paramChange.paramId, paramChange.changeWithUpper(value), paramChange.weight);
        });
      };
    }
  }
}



