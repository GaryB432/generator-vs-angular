class MathService {
    add(addend1: number, addend2: number) {
        return addend1 + addend2;
    }
}

angular.module('app.services', []).service('MathService', [MathService]);
