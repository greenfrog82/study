/**
 * Created by greenfrog on 17. 1. 16.
 */
mainApp.controller('studentController', ($scope) => {
    $scope.student = {
        firstName: 'jae.young',
        lastName: 'Cho',
        fees: 500,
        email: 'jaeyoung.Cho@cdnetworks.com',
        subjects: [
            {name:'Physics',marks:70},
            {name:'Chemistry',marks:80},
            {name:'Math',marks:65},
            {name:'English',marks:75},
            {name:'Hindi',marks:67}
        ],
        fullName: () => {
            const studentObject = $scope.student;
            return studentObject.firstName + ' ' + studentObject.lastName;
        },
        reset: () => {
            $scope.student.firstName = 'jae.young';
            $scope.student.lastName = 'Cho';
            $scope.student.email = 'jaeyoung.Cho@cdnetworks.com';
        }
    };
});