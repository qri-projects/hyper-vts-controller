class Param {
  name: string;
  desc = "param created by hyper-vts-controller";
  min: number;
  max: number;
  defaultValue: number;


  constructor(name: string, min: number, max: number, defaultValue: number, desc?: string) {
    this.name = name;
    this.desc = desc ?? this.desc;
    this.min = min;
    this.max = max;
    this.defaultValue = defaultValue;
  }
}