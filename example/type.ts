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

let password = '123';

class Employee1 {
    private _fullName: string;

    get fullName():string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (password && password === '123') {
            this._fullName = newName;
        } else {
            console.log('error');
        }
    }
}

//  静态属性
class Grid {
    static origin = {
        x: 0,
        y: 0
    }

    scale: number;
    constructor (scale: number) {
        this.scale = scale;
    }

    calculateDistanceFromOrigin(point: {x: number; y: number}) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale;
    }
}

let grid1 = new Grid(1);
let grid2 = new Grid(2);


//  抽象类必须包含抽象方法
abstract class Animal4 {
    //  抽象方法只能在派生类实现
    abstract makeSound(): void
    moveBy(): void {
        console.log('roaming the earth')
    }
}

abstract class Department {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    printName(): void {
        console.log(this.name);
    }

    abstract printMeeting(): void;
}

class AccountingDepartment extends Department {
    constructor() {
        super('aaa');
    }

    printMeeting(): void {
        console.log('bbb')
    }

    generateReports(): void {
        console.log('generating')
    }
}

let department: Department;
//  不可以实例抽象类
// department = new Department();
department = new AccountingDepartment();

class Point1 {
    x1: number
    y1: number
}

interface Point3d extends Point1 {
    z1: number
}

let ponit3d: Point3d = {x1: 1, y1: 2, z1: 3};

(function () {
    function add (x: number, y: number): number {
        return x + y;
    }

    //  函数类型
    let myAdd: (baseValue: number, increment: number) => number = function (x: number, y:number): number {
        return x + y;
    }

    function buildName (firstName: string, lastName?: string): string {
        if (lastName) {
            return firstName + '' + lastName;
        } else {
            return firstName;
        }
    }

    function buildName1 (firstName: string, ...restOfName: string[]): string {
        return firstName + ' ' + restOfName.join(''); 
    }

    let buildNameFn: (fname: string, ...rest: string[]) => string = buildName1;

})();

//  this与类型，在参数中指定this类型
(function () {
    interface Card {
        suit: string,
        card: number
    }
    
    interface Deck {
        suits: string[]
        cards: number[]
        createCardPicker(): () => Card
    }

    let deck: Deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(52),
        createCardPicker: function (this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);

                return {
                    //  this不能推断类型
                    suit: this.suits[pickedSuit],
                    card: pickedCard % 13
                }
            }
        }
    }
    let cardPicked = deck.createCardPicker();
    let pickedCard = cardPicked();
    
    //  箭头函数解决this的约定问题
    interface UIElement {
        addClickListener(onClick: (this:void, e:Event) => void): void;
    }
    
    class Handler1 {
        type: string;
    
        onClickBad = (e: Event) => {
            this.type = e.type;
        }
    }
    let h = new Handler1();

    //  重载
    function pick (x: {suit: string; card: number}[]): void;
    function pick (x: number): void;
    //  重载函数实现
    function pick (x): any {
        if (Array.isArray(x)) {
            console.log(x);
        } else {
            console.log(x);
        }
    }
})();

(function () {
    function identity<T>(arg: T): T {
        return arg;
    }
    let output = identity<string>('myString');

    function loggingIdentity<T>(arg: T[]): T[] {
        console.log(arg.length);
        return arg;
    }

    let myIdentity: <T>(arg: T) => T = identity;

    interface GericIdentityFn<T> {
        (arg: T): T
    }

    let myIdentity1: GericIdentityFn<string> = identity;
})();
