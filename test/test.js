(function () {
    angular.module('main', [ 'MicroTemplate' ])
        // Usage in component without factory.
        .component('mcTest', {
            strict     : 'E',
            template   : NGMicro.template('mc-test'),
            transclude : true
        })
        // Usage in directive with factory.
        .directive('mcInput', function ( MicroTemplate ) {
            return {
                strict   : 'E',
                template : MicroTemplate('mc-input'),
                scope    : {
                    label : '@',
                    value : '='
                }
            }
        })
        .controller('McInput', McInputController)

    function McInputController () {
        var vm = this;

        vm.value = 'Lorem ipsum dolor';
    }
})();