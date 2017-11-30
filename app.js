Vue.filter('doneLabel', function(value) {
    if (value == 0) {
        return 'Não Paga'
    }

    return 'Paga'
});

Vue.filter('statusList', function (value) {
    if (value === false) {
        return 'Nenhuma conta a ser paga';
    } else if(!value) {
        return 'Não existe nenhuma conta a ser paga!';
    } else {
        return 'Existem ' + value + ' contas a serem pagas';
    }
});

var app = new Vue({
    el: '#app',
    data: {
        test: '',
        title: 'Contas a pagar',
        menus: [
            {id: 0, name: 'Listar Contas'},
            {id: 1, name: 'Criar Contas'}
        ],
        activedView: 1,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: '',
            done: 0,
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de Telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            { date_due: '20/08/2016', name: 'Conta de luz', value: 25.99, done: true },
            { date_due: '21/08/2016', name: 'Conta de água', value: 25.99, done: true },
            { date_due: '22/08/2016', name: 'Conta de telefone', value: 25.99, done: false },
            { date_due: '23/08/2016', name: 'Supermercado', value: 25.99, done: true },
            { date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1500.99, done: true },
            { date_due: '25/08/2016', name: 'Empréstimo', value: 25.99, done: true },
            { date_due: '26/08/2016', name: 'Gasolina', value: 25.99, done: false },
        ]
    },
    computed: {
        status: function () {

            if (!this.bills.length) {
                return false
            }

            var count  = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }

            return count;
        }
    },
    methods: {
        showView: function ($event, id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: '',
                done: 0,
            }
            
            this.activedView=0;
        },
        loadBill: function(bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function(index) {
            if (confirm('Deseja excluir esta conta?')) {
                this.bills.splice(index,1);
            }
        }
    }
});



/*
app.$watch('test', function(novoValor, velhoValor) {
    console.log(velhoValor,novoValor);
});
*/