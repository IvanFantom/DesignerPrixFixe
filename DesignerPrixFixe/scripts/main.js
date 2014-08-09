(function () {
    'use strict';

    ko.bindingHandlers.bsShowModal = {
        init: function (element, valueAccessor) {
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();

            if (ko.utils.unwrapObservable(value)) {
                $(element).modal('show');

                $('input', element).focus();
            }
            else {
                $(element).modal('hide');
            }
        }
    };

    function ModalViewModel() {
        var self = this;

        self.modal = ko.observable(false);
        self.showModal = function () {
            self.modal(true);
        };
        self.hideModal = function () {
            self.modal(false);
        }
    };

    function DishViewModel(data) {
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

    function AppViewModel() {
        var self = this;

        self.dishes = ko.observableArray();
        self.modal = ko.observable(new ModalViewModel());
        self.isAnyChecked = ko.computed(function () {
            for (var i = 0; i < self.dishes().length; i++) {
                if (self.dishes()[i].isChecked()) {
                    return true;
                }
            }

            return false;
        });
        self.isAllChecked = ko.observable(false);
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
        self.toggleAllCheckboxes = function () {
            var all = self.isAllChecked();
            ko.utils.arrayForEach(self.dishes(), function (dish) {
                dish.isChecked(all);
            });
            return true;
        }
        self.reset = function () {
            self.isAllChecked(false);

            ko.utils.arrayForEach(self.dishes(), function (dish) {
                dish.isChecked(false);
                dish.quantity(1);
            });
        }
    }

    var appViewModel = new AppViewModel();
    var mapping = {
        'dishes': {
            create: function (options) {
                return new DishViewModel(options.data);
            }
        }
    }
    
    ko.mapping.fromJS(data, mapping, appViewModel);

    ko.applyBindings(appViewModel);
})();