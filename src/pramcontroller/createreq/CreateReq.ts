import { ParamInvoker } from "@/pramcontroller/ParamInvoker";

export class ParamChangeCreateReq {
  name: string;
  paramId: string;
  changeWithUpperString: string;


  constructor(name: string, paramId: string, changeWithUpperString?: string) {
    this.name = name;
    this.paramId = paramId;
    this.changeWithUpperString = changeWithUpperString ?? "value";
  }
}

/**
 * 控制变更的方式
 */
export enum ChangeControlType {
  // 方法字符串
  METHOD_STRING,
  // 参数组装
  PARAM_CHANGE_ASSEMBLE
}

export class ParamInvokerCreateReq {
  // 名称
  name: string;
  // 备注
  desc?: string;
  // 控制变更的方式
  changeControlType: ChangeControlType;
  // 控制变更的方法的字符串
  genApplyValueCommandString?: string;
  // Param组装
  paramChangeCreateReqs?: Array<ParamChangeCreateReq>;


  constructor(name: string, desc: string, changeControlType: ChangeControlType, genApplyValueCommandString?: string, paramChangeCreateReqs?: Array<ParamChangeCreateReq>) {
    this.name = name;
    this.desc = desc;
    this.changeControlType = changeControlType;
    this.genApplyValueCommandString = genApplyValueCommandString;
    this.paramChangeCreateReqs = paramChangeCreateReqs;
  }

  static genWithMethodString(name: string, desc: string, genApplyValueCommandString: string): ParamInvokerCreateReq {
    return new ParamInvokerCreateReq(name, desc, ChangeControlType.METHOD_STRING, genApplyValueCommandString, undefined);
  }

  static genWithParamChangeAssemble(name: string, desc: string, paramChangeCreateReqs: [ParamChangeCreateReq]): ParamInvokerCreateReq {
    return new ParamInvokerCreateReq(name, desc, ChangeControlType.PARAM_CHANGE_ASSEMBLE, undefined, paramChangeCreateReqs);
  }
}

export enum ParamInvokerButtonType {
  SWITCH, RADIO, SELECTOR, SLIDER, INPUT
}

export class ParamInvokerViewInfo {
  buttonType: ParamInvokerButtonType;
  valueRangeStart?: number;
  valueRangeEnd?: number;
  options?: Array<string>;


  constructor(buttonType: ParamInvokerButtonType, valueRangeStart?: number, valueRangeEnd?: number, options?: Array<string>) {
    this.buttonType = buttonType;
    this.valueRangeStart = valueRangeStart;
    this.valueRangeEnd = valueRangeEnd;
    this.options = options;
  }

  static genSwitch(): ParamInvokerViewInfo {
    return new ParamInvokerViewInfo(ParamInvokerButtonType.SWITCH);
  }

  static genRadio(options: Array<string>): ParamInvokerViewInfo {
    const res = new ParamInvokerViewInfo(ParamInvokerButtonType.RADIO);
    res.options = options;
    return res
  }
}