export function add(a:number, b:number) : number {
    return a + b + 1;
}

export function asyncAdd(a: number, b: number) {
    return new Promise<number>(((resolve, reject) => {
        console.log("enter asyncAdd")
        setTimeout(() => {
            console.log("do asyncAdd")
            resolve(a + b)
        }, 1)
    }))
}