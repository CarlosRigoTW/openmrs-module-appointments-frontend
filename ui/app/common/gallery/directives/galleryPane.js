angular.module('bahmni.common.gallery')
    .directive('bmGalleryPane', ['$rootScope', '$document', function ($rootScope, $document) {

        var $body = $document.find('body');
        
        $rootScope.$on('$stateChangeStart', function () {
            $('body #gallery-pane').remove();
            $body.removeClass('gallery-open');
        });

        var link = function ($scope, element) {
            $scope.galleryElement = element;
            $('body').prepend($scope.galleryElement);
            $body.addClass('gallery-open');

            KeyboardJS.on('right', function () {
                $scope.$apply(function () {
                    $scope.showNext();
                });
            });
            KeyboardJS.on('left', function () {
                $scope.$apply(function () {
                    $scope.showPrev();
                });
            });
            $scope.$on('$destroy', function () {
                KeyboardJS.clear('right');
                KeyboardJS.clear('left');
            });
        };

        var controller = function ($scope) {
            $scope.imageIndex = $scope.imageIndex ? $scope.imageIndex : 0;
            $scope.isActive = function (index) {
                return $scope.imageIndex == index;
            };

            $scope.showPrev = function () {
                $scope.imageIndex = ($scope.imageIndex > 0) ? --$scope.imageIndex : $scope.photos.length - 1;
            };

            $scope.showNext = function () {
                $scope.imageIndex = ($scope.imageIndex < $scope.photos.length - 1) ? ++$scope.imageIndex : 0;
            };

            $scope.close = function () {
                $scope.galleryElement.remove();
                $body.removeClass('gallery-open');
            };
        };

        return {
            link: link,
            controller: controller,
            templateUrl: '../common/gallery/views/gallery.html'
        }
    }]);
