let isBoolean: boolean = true;
let declitera: number = 20;
let name1: string = 'bob';
let name2: string = `tom`;
let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];
//  元祖
let x: [string, number] = ['a' , 2];
//  枚举
enum Color {
    Red,
    Green,
    Blue
}
let c = Color.Blue;
let notSure: any = 4;
//  无
function warnUser (): void {
    console.log('no return');
}
//  strictNullCheck 对null检查
let num: number | null = 3;
num = null;
//  永远不存在的类型，函数无返回值，null和never是任何类型的子类型
function error (message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while(true){}
}
declare function create(o: object | null): void;
create(null);
//  类型断言
let someValue: any = 'this is a string';
// let strLength: number = (<string>someValue).length;
let strLength:number = (someValue as string).length;