var a;
a = {
    name: 'atguigu'
};
var obj;
obj = {
    name: 'atguigu',
    age: 18
};
// &同时满足
var objnew;
objnew = {
    name: 'atguigu',
    age: 18
};
var obj1;
obj1 = { name: 'hello' };
var obj2;
obj2 = { name: '123', age: 18 };
var func;
func = function (num1, num2) {
    return num1 + num2;
};
var arr;
arr = [1, 2, 3, 4];
var arr2;
arr2 = ['at', 'gui', 'gu'];
//tuple
var tur;
tur = ['atguigu', 2];
var numTur;
numTur = [1, 2, 3];
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
var men;
men = Gender.male;
var woman = Gender.female;
var i;
i = {
    name: 'atguigu',
    gender: Gender.male
};
console.log(i.gender === Gender.male);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
