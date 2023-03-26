export const categories = [
    {
        id: 0,
        title: 'Все'
    },
    {
        id: 1,
        title: 'Бесшумные'
    },
    {
        id: 2,
        title: 'Компактные'
    },
    {
        id: 3,
        title: 'Мульти-девайс'
    },
    {
        id: 4,
        title: 'MX-серия'
    },
    {
        id: 5,
        title: 'Ergo-серия'
    }
];

export const sorts = [
    {
        id: 0,
        title: 'популярности',
        sortProperty: 'rating'
    },
    {
        id: 1,
        title: 'стоимости',
        sortProperty: 'price'
    },
    {
        id: 2,
        title: 'алфавиту',
        sortProperty: 'title'
    }
];

export const filtersMice = [
    {
        id: 0,
        title: 'Статус товара',
        sort: [
            {
                id: 0,
                name: 'Товары по акции'
            },
            {
                id: 1,
                name: 'Новинка'
            },
            {
                id: 2,
                name: 'Распродажа'
            }
        ]
    },
    {
        id: 1,
        title: 'Тип беспроводного соединения',
        sort: [
            {
                id: 3,
                name: 'Bluetooth'
            },
            {
                id: 4,
                name: 'радиоканал'
            }
        ]
    },
    {
        id: 2,
        title: 'Разрешение сенсора',
        sort: [
            {
                id: 5,
                name: 'от 1000 до 2000 dpi'
            },
            {
                id: 6,
                name: 'от 2000 до 3000 dpi'
            },
            {
                id: 7,
                name: 'от 3000 до 4000 dpi'
            }
        ]
    },
    {
        id: 3,
        title: 'Питание',
        sort: [
            {
                id: 8,
                name: 'AA'
            },
            {
                id: 9,
                name: 'AAA'
            },
            {
                id: 10,
                name: 'собственный'
            }
        ]
    },
    {
        id: 4,
        title: 'Количество кнопок',
        sort: [
            {
                id: 11,
                name: '2'
            },
            {
                id: 12,
                name: '3'
            },
            {
                id: 13,
                name: '4+'
            }
        ]
    }
];

export const filtersKeyboards = [
    {
        id: 0,
        title: 'Статус товара',
        sort: [
            {
                id: 0,
                name: 'Товары по акции'
            },
            {
                id: 1,
                name: 'Новинка'
            },
            {
                id: 2,
                name: 'Распродажа'
            }
        ]
    },
    {
        id: 1,
        title: 'Тип беспроводного соединения',
        sort: [
            {
                id: 3,
                name: 'Bluetooth'
            },
            {
                id: 4,
                name: 'радиоканал'
            }
        ]
    },
    {
        id: 2,
        title: 'Особенности',
        sort: [
            {
                id: 5,
                name: 'Механическая'
            },
            {
                id: 6,
                name: 'Slim-дизайн'
            },
            {
                id: 7,
                name: 'Без цифрового блока'
            }
        ]
    },
    {
        id: 3,
        title: 'Подсветка',
        sort: [
            {
                id: 8,
                name: 'есть'
            },
            {
                id: 9,
                name: 'нет'
            }
        ]
    }
];

export const filtersMiceArr = [];
export const filtersKeyboardsArr = [];

const filterSort = (filters, arr) => {
    const filtersSorted = filters.map(filter => (
        filter.sort.map(item => (
            arr.push(item)
        ))
    ));
    return filtersSorted;
};

filterSort(filtersMice, filtersMiceArr);
filterSort(filtersKeyboards, filtersKeyboardsArr);