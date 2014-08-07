(function ($) {
    'use strict';

    function Dish(data) {
        var self = this;

        self.isChecked = ko.observable(false);
        self.imageSrc = ko.observable();
        self.name = ko.observable();
        self.price = ko.observable();
        self.quantity = ko.observable();
        self.subTotal = ko.computed(function () {
            return self.price() * parseInt('0' + self.quantity(), 10);
        }, this);
        
        ko.mapping.fromJS(data, {}, this);
    }

    function DishViewModel() {
        var self = this;

        self.isCheckedAll = ko.observable(false);
        self.dishes = ko.observableArray();
        self.total = ko.computed(function () {
            var total = 0;

            ko.utils.arrayForEach(self.dishes(), function (dish) {
                total += dish.isChecked() ? dish.subTotal() : 0;
            });

            return total;
        }, this);

        self.formatCurrency = function (value) {
            return '$ ' + value.toFixed(2);
        }
        self.toggleAllCheckboxes = function() {
            var all = self.isCheckedAll();
            ko.utils.arrayForEach(self.dishes(), function (dish) {
                dish.isChecked(all);
            });
            return true;
        }
    }

    var viewModel = new DishViewModel();
    var mapping = {
        'dishes': {
            create: function (options) {
                return new Dish(options.data);
            }
        }
    }

    $.ajax({
        url: 'scripts/ajax/data.json',
        success: function (data) {
            ko.mapping.fromJSON(data, mapping, viewModel);
        },
        async: false
    });   

    ko.applyBindings(viewModel);
})(jQuery);