/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope, IrregularVerbsService) {

    //this.userName = 'Example user';
    //this.helloText = 'Welcome in SeedProject';
    ///this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    $scope.irregularVerbs = [];
    $scope.finalResult = '';


    var score = 0;

    $scope.checkAnswer = function (event, verb, verbType, answer, rightAnswer, rightAnswer2) {

        alertify
            .logPosition("top right")
            .maxLogItems(10);

        $(event.target).removeClass('input-wrong-answer');

        var keyPressed = event.which || event.keyCode;


        if(keyPressed == 13 || keyPressed == 9){

            if(answer == '' || answer == undefined) return;

            if(answer == rightAnswer || answer == rightAnswer2){
                console.log('Certa resposta!!!');

                if(rightAnswer2){
                    answer = rightAnswer+' / '+rightAnswer2;
                }

                if(verb[verbType]){
                    verb['status'+verbType] = 2;
                    score += 2.5;
                    alertify.success("<span style='font-size: 2em'>+2,5 Pt</span>");
                }else{
                    verb['status'+verbType] = 1;
                    score += 5;
                    alertify.success("<span style='font-size: 2em'>+5 Pt</span>");
                }

                $('.score-value').text(score);

                if(keyPressed == 13){
                    if($('input:enabled').index(event.target) < $('input:enabled').length-1){
                        $('input:enabled')[$('input:enabled').index(event.target)+1].focus();
                    }
                }



            }else {
                console.log('Erooooooooooou!');


                $(event.target).addClass('input-wrong-answer');
                $(event.target).focus();

                if (verb[verbType]) {
                    verb[verbType].trials++;
                    if (verb[verbType].trials == 2) {
                        $(event.target).addClass('input-wrong');
                        verb['status' + verbType] = 3;
                        if ($('input:enabled').index(event.target) < $('input:enabled').length - 1) {
                            $('input:enabled')[$('input:enabled').index(event.target) + 1].focus();
                        }
                    }
                } else {
                    verb[verbType] = {};
                    verb[verbType].trials = 1;
                    alertify.error("<span style='font-size: 2em'>Try again!</span>");


                    if (keyPressed == 9) {
                        setTimeout(function () {
                            $(event.target).focus();
                        }, 10);

                    }

                }
            }
        }

        /*if(score < 0){
            $('.score').removeClass('gray-bg');
            $('.score').removeClass('yellow-bg');
            $('.score').addClass('red-bg');
        }
        if(score > 0){
            $('.score').removeClass('red-bg');
            $('.score').removeClass('gray-bg');
            $('.score').removeClass('navy-bg');
            $('.score').addClass('yellow-bg');
        }

        if(score > 40){
            $('.score').removeClass('yellow-bg');
            $('.score').removeClass('lazur-bg');
            $('.score').addClass('navy-bg');
        }

        if(score > 70){
            $('.score').removeClass('navy-bg');
            $('.score').addClass('lazur-bg');
        }

        if(score > 70){
            $('.score').addClass('yellow-shadow');
        }else{
            $('.score').removeClass('yellow-shadow');
        }*/


        setTimeout(function () {
            if($('input:disabled').length == $('input').length){

                if(score < 50){
                    $scope.finalResult = 3;
                }
                if(score >= 50 && score < 70){
                    $scope.finalResult = 2;
                }
                if(score >= 70){
                    $scope.finalResult = 1;
                }
                $scope.$apply();
            }
        },100)



    }

    IrregularVerbsService.get().then(function (res) {
        console.log(res);
        $scope.irregularVerbs = res;
    });
    
    
};

function IrregularVerbsService($http, $q) {
    return {
        get: function () {
            return $q(function (resolve, reject) {
                $http.get(location.origin+'/api/irregular_verbs.json').then(function (res) {
                    resolve(res.data);
                });
            });
        }
    }
}




angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .service('IrregularVerbsService', IrregularVerbsService)