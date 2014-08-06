(function ($) {
    'use strict';

    function formatCurrency(value) {
        return "$" + value.toFixed(2);
    }

    var DishViewModel = function () {
        var self = this;

        self.dishes = [
			new Dish({ imageSrc: "holder.js/50x50", name: "Dish1", price: "100" }),
			new Dish({ imageSrc: "holder.js/50x50", name: "Dish2", price: "200" }),
			{ imageSrc: "holder.js/50x50", name: "Dish3", price: "300" },
			{ imageSrc: "holder.js/50x50", name: "Dish4", price: "400" },
			{ imageSrc: "holder.js/50x50", name: "Dish5", price: "500" },
			{ imageSrc: "holder.js/50x50", name: "Dish6", price: "600" },
			{ imageSrc: "holder.js/50x50", name: "Dish7", price: "700" },
			{ imageSrc: "holder.js/50x50", name: "Dish8", price: "800" },
			{ imageSrc: "holder.js/50x50", name: "Dish9", price: "900" },
			{ imageSrc: "holder.js/50x50", name: "Dish10", price: "1000" },
			{ imageSrc: "holder.js/50x50", name: "Dish11", price: "1100" },
			{ imageSrc: "holder.js/50x50", name: "Dish12", price: "1200" },
			{ imageSrc: "holder.js/50x50", name: "Dish13", price: "1300" },
			{ imageSrc: "holder.js/50x50", name: "Dish14", price: "1400" },
			{ imageSrc: "holder.js/50x50", name: "Dish15", price: "1500" }
        ];
    }

    var Dish = function () {
        var self = this;

        self.imageSrc = ko.observable();
        self.name = ko.observable();
        self.price = ko.observable();
        self.quantity = ko.observable(1);
        self.subTotal = ko.computed(function () {
            return self.name() ? self.price() * parseInt("0" + self.quantity(), 10) : 0;
        });
    }

    ko.applyBindings(new DishViewModel());
})(jQuery);