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
function sangangsi () {
    var a = 10;
}
let input = [1, 2];
let [first, second] = input;
function f([first, second]: [number, number]) {}
let [,,third] = [1, 2, 3];
let o = {
    a: 1,
    b: 2
};
let {a: newName1, b: newName2} = o;
let {...d} = o;
function keepWholeObject(wholeObject: {a: string, b?: number}) {
    let {a, b = 1001} = wholeObject;
}
function f1({a, b = 0} = {a: ''}): void {
}
f1({a: 'yes'});
interface LabelledValue {
    label: string
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
let myObj = {
    size: 10,
    label: 'aa'
}
printLabel(myObj);
interface Square {
    color: string,
    area: number
}
//  可以发现拼写错误
interface SquareConfig {
    color?: string,
    width?: number
}
function createSquare(config: SquareConfig): Square {
    let newSquare = {color: 'red', area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare = createSquare({
});
//  当变量用const，当属性用readonly
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {x: 10, y: 20};
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;