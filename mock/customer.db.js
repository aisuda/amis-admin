const db = {
    data: [],

    init: function() {
        this.data = [
            {
                id: 1,
                name: '张珊',
                age: 18,
                tel: '13111011101',
                gender: 0,
                company: 'XX XX XX'
            },

            {
                id: 2,
                name: '李思',
                age: 18,
                tel: '13111011101',
                gender: 1,
                company: 'XX XX XX'
            },

            {
                id: 3,
                name: '王武',
                age: 18,
                tel: '13111011101',
                gender: 1,
                company: 'XX XX XX'
            }
        ];
    },

    index: function(page, perPage) {
        page = page || 1;
        perPage = perPage || 10;
        const arr = this.data.concat().splice((page - 1) * perPage, 10);
        return {
            items: arr,
            count: this.data.length
        }
    }
};

db.init();