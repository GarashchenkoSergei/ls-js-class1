/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */

function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve();
        }, seconds * 1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

function loadAndSortTowns() {
    let citiesArray = [];

    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(response => response.json())
        .then(cities => {
            for (let i = 0; i < cities.length; i++) {
                citiesArray.push(cities[i]);
            }
            citiesArray = citiesArray.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            });

            return citiesArray;
        });
}

// function selectionSort(array) {
//     var length = array.length;
//     var min;
  
//     for (var i = 0; i < length; i++) {
//         min = i;
      
//         for (var j = i + 1 ; j < length; j++) {
//             if (array[min].name > array[j].name) {
//                 min = j;
//             }
//         }
      
//         var temp = array[i];

//         array[i] = array[min];
//         array[min] = temp;
//     }
  
//     return array;
// }

// function loadAndSortTowns() {
//     let citiesArray = [];

//     return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
//         .then(response => response.json())
//         .then(cities => {
//             for (let i = 0; i < cities.length; i++) {
//                 citiesArray.push(cities[i]);
//             }

//             return selectionSort(citiesArray);
//         });
// }

export {
    delayPromise,
    loadAndSortTowns
};
