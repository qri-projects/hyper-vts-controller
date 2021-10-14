import { ParamChangeCreateReq } from "@/pramcontroller/createreq/CreateReq";

export class ParamChange {
  paramId: string;
  name: string;
  value = 0;
  weight = 1
  
  changeWithUpper = (upperValue: number|string|boolean): number => {
    return 0;
  }

  changeValue(value: number) {
    this.value = value;
  }

  genApplyValueCommand(): string {
    return "1";
  }


  constructor(paramChangeCreateReq: ParamChangeCreateReq) {
    this.paramId = paramChangeCreateReq.paramId;
    this.name = paramChangeCreateReq.name

    eval(
      "this.changeWithUpper = (value) =>" +
        paramChangeCreateReq.changeWithUpperString
    );
  }
}