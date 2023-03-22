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

export const filters = [
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
        ],
        filterProperty: 'status'
    },
    {
        id: 1,
        title: 'Тип беспроводного соединения',
        sort: [
            {
                id: 0,
                name: 'Bluetooth'
            },
            {
                id: 1,
                name: 'радиоканал'
            }
        ],
        filterProperty: 'connection'
    },
    {
        id: 2,
        title: 'Разрешение сенсора',
        sort: [
            {
                id: 0,
                name: 'от 1000 до 2000 dpi'
            },
            {
                id: 1,
                name: 'от 2000 до 3000 dpi'
            },
            {
                id: 2,
                name: 'от 3000 до 4000 dpi'
            }
        ],
        filterProperty: 'resolution'
    },
    {
        id: 3,
        title: 'Питание',
        sort: [
            {
                id: 0,
                name: 'AA'
            },
            {
                id: 1,
                name: 'AAA'
            },
            {
                id: 2,
                name: 'собственный'
            }
        ],
        filterProperty: 'power'
    },
    {
        id: 4,
        title: 'Количество кнопок',
        sort: [
            {
                id: 0,
                name: '2'
            },
            {
                id: 1,
                name: '3'
            },
            {
                id: 2,
                name: '4+'
            }
        ],
        filterProperty: 'buttons-count'
    }
];