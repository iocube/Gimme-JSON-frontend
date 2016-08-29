(function () {
    'use strict';

    angular.module('gimmeJSONApp').directive('tooltip', tooltip);
    tooltip.$inject = ['$compile', '$templateRequest'];

    function tooltip($compile, $templateRequest) {
        var directive = {
            restrict: 'A',
            scope: {
                tooltipText: '@',
                classname: '@?'
            },
            link: function(scope, elem) {

                elem[0].addEventListener('mouseenter', function() {
                    var rect = elem[0].getBoundingClientRect();
                    var elemBackgroundColor = window.getComputedStyle(elem[0]).backgroundColor;
                    var elemColor = window.getComputedStyle(elem[0]).color;

                   $templateRequest('scripts/utility/tooltip-element.html').then(function(html) {
                        var template = angular.element(html);
                        var domElement = $compile(template)(scope);

                        //TODO: fix button flickering on hover
                        domElement[0].style.position = 'absolute';
                        domElement[0].style.display = 'inline';
                        domElement[0].style.top = rect.top - 20 + 'px';
                        domElement[0].style.right = rect.right + 'px';
                        domElement[0].style.left = rect.left + 'px';
                        domElement[0].style.width = rect.width + 'px';
                        domElement[0].style.textAlign = 'center';

                        document.body.appendChild(domElement[0]);

                        var tooltip = document.body.getElementsByClassName('tooltip')[0];
                        tooltip.style.background = elemBackgroundColor;
                        tooltip.style.color = elemColor;
                   });
                });

                elem[0].addEventListener('mouseleave', function() {
                    document.getElementsByClassName('tooltip')[0].remove();
                });
            }
        };

        return directive;
    }
})();
