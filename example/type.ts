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
    width?: number,
    //  索引前缀
    [propName: string]: any
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
//  ts对对象字面量有检查，可以利用索引签名和对象跳过这个检查
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

//  函数类型接口
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
}

//  数组类型接口(索引签名)
interface StringArray {
    [index: number]: string
}

let myArray: StringArray;

myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];

class Animal {
    name: string
}

class Dog extends Animal {
    bread: string
}

//  数字索引类型返回值是字符串索引类型返回值的子类型

// interface NotOkay {
//     [x: number]: Animal,
//     [x: string]: Dog
// }

interface NotOkay {
    [x: number]: Dog,
    [x: string]: Animal
}

interface NumberDictionaray {
    [index: string]: number,
    length: number,
    //  string不能赋给字符串索引类型Number
    // name: string
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray1: ReadonlyStringArray = ['a', 'b'];

//  接口定义类
//  这是对类的实例部分做类型检查，constructor是静态部分，不做检查
interface ClockInterface {
    currentTime: Date,
    setTime(d: Date): void
}

interface ClockConstructor {
    new(hour: number, minute: number)
}

class Clock implements ClockInterface {
    currentTime: Date

    constructor (h: number, m: number) {}

    setTime (d: Date) {
        this.currentTime = d;
    }
}

// class Clock1 implements ClockConstructor {
//     constructor (hour: number, minute: number) {}
// }

interface ClockInterface1 {
    tick(): void
}

//  接口定义构造函数
interface ClockConstructor1 {
    new(hour: number, minute: number)
}

function createClock(ctor: ClockConstructor1, h: number, m: number): ClockInterface1 {
    return new ctor(h, m);
}

class DigitalClock1 implements ClockInterface1 {
    constructor(h: number, m: number) {}

    tick() {}
}

class AnalogClock1 implements ClockInterface1 {
    constructor(h: number, m: number) {}

    tick() {}
}

let digital = createClock(DigitalClock1, 12, 1);
let analog1 = createClock(AnalogClock1, 12, 1);

// 接口的相互继承
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number
}

interface Square1 extends Shape, PenStroke {
    sideLength: number
}
let square: Square1;
square.color = 'a';
square.sideLength = 2;
square.penWidth = 3;

//  混合类型
//  既可以是函数，也可以是对象
interface Counter {
    (start: number): string,
    interval: number,
    reset(): void
}

function getCounter(): Counter {
    let counter = <Counter>(function (s: number): string{ return a + ''});
    counter.interval = 123;
    counter.reset = () => {};
    return counter;
}

//  接口继承类
class Control {
    private state: any
}

interface SelectableControl extends Control {
    select(): void
}

class Button extends Control implements SelectableControl {
    select(): void {
    }
}

class Button1 extends Control {
    select(): void {
    }
}

//  Button2没有继承Control就去实现SelectableControl，会缺少state属性
// class Button2 implements SelectableControl {
//     select(): void {
//     }
// }

class Greeter {
    greeting: string

    constructor (message: string) {
        this.greeting = message;
    }

    greet () {
        return 'Hello, ' + this.greeting;
    }
}

let greeter1 = new Greeter('world');
greeter1.greet();

class Animal1 {
    name: string;

    constructor (name: string) {
        this.name = name;
    }

    move (distance: number = 0) {
        console.log(`${this.name} moved ${distance}`);
    }
}

class Dog1 extends Animal1 {
    constructor(name: string) {
        super(name);
    }

    bark () {
        console.log('a')
    }
}

class Snake extends Animal1 {
    constructor(name: string) {
        super(name);
    }

    move (distance: number = 0) {
        console.log(`Slithering....`);
        super.move(distance);
    }
}

class Horse extends Animal1 {
    constructor (name: string) {
        super(name);
    }

    move (distance: number = 0) {
        console.log(`Galloping....`);
        super.move(distance);
    }
}

const dog = new Dog1('a');
dog.bark();
dog.move(10);

//  类型兼容
class Animal3 {
    private name: string;

    constructor (name: string) {
        this.name = name;
    }
}

class Rhing extends Animal3 {
    constructor () {
        super('a');
    }
}

class Employy {
    private name: string;
    constructor (name: string) {
        this.name = name;
    }
}

let animal3 = new Animal3('a');
let rhino = new Rhing();
let employee = new Employy('c');
animal3 = rhino;
//  私有成员来源不一样，不兼容
//   animal3= employee;

//  protected在子类无法访问

class Person {
    protected name: string;

    constructor (name: string) {
        this.name = name;
    }
}

class Employee extends Person {
    private department: string
    
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    getElevatorPitch () {
        return `Hello ${this.name}`
    }
}

let howard = new Employee('Howard', 'a');
howard.getElevatorPitch();
//  protected只能在子类使用，不能在外面使用
// howard.name;

class Person1 {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

let john = new Person1('john');
//  name是只读属性
// john.name = '';