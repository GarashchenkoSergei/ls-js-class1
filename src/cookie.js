/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// достаем cookie из браузера и вкладываем их в объект
const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev[name] = value;

    return prev;
}, {});

// загружаем контент (cookies и их значения) на страницу в виде таблицы
document.addEventListener('DOMContentLoaded', () => {
    for (let cookie in cookies) {
        if (cookies.hasOwnProperty(cookie)) {
            const tableRow = document.createElement('tr');
            const tableCellName = document.createElement('th');
            const tableCellValue = document.createElement('th');
            const tableCellDeleteBtn = document.createElement('th');
            const tableDeleteBtn = document.createElement('button');

            tableRow.classList.add('table__row');
            tableCellName.classList.add('table__row-name');

            tableDeleteBtn.addEventListener('click', () => {
                tableDeleteBtn.closest('.table__row').remove();
                document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            })
        
            tableCellDeleteBtn.appendChild(tableDeleteBtn);
            tableRow.appendChild(tableCellName);
            tableRow.appendChild(tableCellValue);
            tableRow.appendChild(tableCellDeleteBtn);
            tableDeleteBtn.textContent = 'удалить';
            tableCellName.textContent = cookie;
            tableCellValue.textContent = cookies[cookie];
            listTable.appendChild(tableRow);
        }
    }
});

// добавляем фильтр на input. Сравниваем значение в input и значения отображенные в DOM (cookie не трогаем)
filterNameInput.addEventListener('keyup', function() {
    let filter = filterNameInput.value.toUpperCase();
    let names = document.getElementsByClassName('table__row-name');
    
    for (let i = 0; i < names.length; i++) {
        names[i].parentNode.style.display = 'none';

        let txtValue = names[i].textContent || names[i].innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1 ) {
            names[i].parentNode.style.display = '';
        }
    }
});

// обработчик добавления новых куки. Если cookie уже есть, то перезаписывает его значение.
addButton.addEventListener('click', () => {
    addCookie(addNameInput.value, addValueInput.value);
    document.location.reload();
}); 

function addCookie(key, value) {
    if (!key || !value) {
        return;
    }
    for (let cookie in cookies) {
        if (cookies.hasOwnProperty(cookie)) {
            if (cookie !== key) {
                return document.cookie = `${key}=${value}`;
            }
            
            return document.cookie = `${cookie}=${value}`;
        }
    }
}