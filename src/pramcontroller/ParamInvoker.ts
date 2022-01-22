import { ParamChange } from "@/pramcontroller/ParamChange";
import {
  ChangeControlType,
  ParamChangeCreateReq,
  ParamInvokerCreateReq,
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
  viewInfo: ParamInvokerViewInfo;

  desc?: string;
  options?: [number];
  range?: [number];


  genInject2VtsReq(value: number|string|boolean): Array<InjectParamValue> {
    const injectParamValues: Array<InjectParamValue> = [];

    function apply(paramId: string, value: number, weight?: number) {
      injectParamValues.push(new InjectParamValue(paramId, value, weight));
    }

    this.genInject2VtsReqFromUser(apply, value);
    return injectParamValues;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  genInject2VtsReqFromUser: (apply: (paramId: string, value: number, weight?: number) => void, value: number|boolean|string) => void;


  constructor(req: ParamInvokerCreateReq, viewInfo: ParamInvokerViewInfo) {
    this.name = req.name;
    this.desc = req.desc;
    this.viewInfo = viewInfo;
    if (req.changeControlType === ChangeControlType.METHOD_STRING) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.genInject2VtsReqFromUser = (apply, value) => {
      };
      eval("this.genInject2VtsReqFromUser = (apply, value) => " + req.genApplyValueCommandString!);
    } else {
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



