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

export class ParamInvokerData {
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
  paramInvokerViewInfo: ParamInvokerViewInfo;
  value: number|string|boolean = 0


  constructor(name: string,
              desc: string,
              changeControlType: ChangeControlType,
              paramInvokerViewInfo: ParamInvokerViewInfo,
              genApplyValueCommandString?: string,
              paramChangeCreateReqs?: Array<ParamChangeCreateReq>,
              value?: number|string|boolean) {
    this.name = name
    this.desc = desc
    this.changeControlType = changeControlType
    this.genApplyValueCommandString = genApplyValueCommandString
    this.paramChangeCreateReqs = paramChangeCreateReqs
    this.paramInvokerViewInfo = paramInvokerViewInfo
    this.value = value ?? paramInvokerViewInfo.defaultValue
  }

  static newEmpty() {
    return new ParamInvokerData("", "", ChangeControlType.METHOD_STRING,
      new ParamInvokerViewInfo(ParamInvokerButtonType.RADIO, 0, 0, new Array<string>()),
      "", undefined
    )
  }
}

export enum ParamInvokerButtonType {
  RADIO, SLIDER, INPUT
}

export class ParamInvokerViewInfo {
  buttonType: ParamInvokerButtonType;
  valueRangeStart?: number;
  valueRangeEnd?: number;
  options?: Array<string>;
  defaultValue: number | string | boolean


  constructor(buttonType: ParamInvokerButtonType, valueRangeStart?: number, valueRangeEnd?: number, options?: Array<string>, defaultValue = 0) {
    this.buttonType = buttonType;
    this.valueRangeStart = valueRangeStart;
    this.valueRangeEnd = valueRangeEnd;
    this.options = options;
    this.defaultValue = defaultValue
  }

  static genRadio(options: Array<string>): ParamInvokerViewInfo {
    const res = new ParamInvokerViewInfo(ParamInvokerButtonType.RADIO);
    res.options = options;
    return res
  }
}