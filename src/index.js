/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        let arrItem = array[i];
        
        fn(arrItem, [i], array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

function map(array, fn) {
    var newNumbers = [];

    for (let i = 0; i < array.length; i++) {
        let arrItem = array[i];
        
        newNumbers.push(fn(arrItem, [i], array));
    }

    return newNumbers;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    var initialValue;
    var previousValue;
    var newArray;

    if (initial) {
        initialValue = initial;
    } else {
        initialValue = array[0];
        newArray = array.slice(1);
        array = newArray;
    }

    for (let i = 0; i < array.length; i++) {
        let currentItem = array[i];
        
        if (previousValue == undefined) {
            previousValue = fn(initialValue, currentItem, [i], array);
        } else {
            previousValue = fn(previousValue, currentItem, [i], array);
        }
    }

    return previousValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    var objArray = Object.getOwnPropertyNames(obj);

    for (let i = 0; i < objArray.length; i++) {
        var upperCaseName = objArray[i].toUpperCase();

        objArray[i] = upperCaseName;
    }

    return objArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
