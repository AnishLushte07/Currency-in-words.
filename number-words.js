(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.NumberToWordSting = factory();
    }
})(this, toWordsModule);

function toWordsModule() {
    var digitSingle = {
        '0': null,
        '1': "one",
        '2': "two",
        '3': "three",
        '4': "four",
        '5': "five",
        '6': "six",
        '7': "seven",
        '8': "eight",
        '9': "nine"
    };

    var digitDouble = {
        '2': "twenty",
        '3': "thirty",
        '4': "forty",
        '5': "fifty",
        '6': "sixty",
        '7': "seventy",
        '8': "eighty",
        '9': "ninety"
    };

    var digitStartWithOne = {
        '10': 'ten',
        '11': 'eleven',
        '12': 'twelve',
        '13': 'thirteen',
        '14': 'fourteen',
        '15': 'fifteen',
        '16': 'sixteen',
        '17': 'seventeen',
        '18': 'eighteen',
        '19': 'nineteen'
    };

    function setLacAndThousand(first, second, name) {
        outputA = [];
        outputA.unshift(name);
        if (first === '0') {
            outputA.unshift(digitSingle[second]);
        } else {
            if (first === '1') {
                outputA.unshift(digitStartWithOne[first + second]);
            } else {
                outputA.unshift(digitSingle[second]);
                outputA.unshift(digitDouble[first]);
            }
        }

        return outputA;
    }

    function convertToWords(a) {

        if (isNaN(a)) {
            throw a + ' this is not valid number.';
        }

        console.log(a, typeof(a));

        if (!Number.isInteger(a)) {
            throw 'Please enter only integer value';
        }

        if (a.toString().length > 9) {
            throw 'Enter number with 9 or less than 9 digit';
        }

        var input = a.toString().split("");
        var inputLength = input.length;


        var hundred = [],
            thousand = [],
            lac = [],
            crore = [];


        if (inputLength < 3) {
            for (var i = 0; i < 3 - inputLength; i++) {
                input.unshift("0");
            }
        } else if (inputLength > 3 && inputLength < 5) {
            input.unshift("0");
        } else if (inputLength > 5 && inputLength < 7) {
            input.unshift("0");
        } else if (inputLength > 7 && inputLength < 9) {
            input.unshift("0");
        }

        if (input.length === 3) {
            hundred = input.slice(0, 3);
        } else if (input.length === 5) {
            hundred = input.slice(2, 5);
            thousand = input.slice(0, 2);
        } else if (input.length === 7) {
            hundred = input.slice(4, 7);
            thousand = input.slice(2, 4);
            lac = input.slice(0, 2);
        } else if (input.length === 9) {
            hundred = input.slice(6, 9);
            thousand = input.slice(4, 6);
            lac = input.slice(2, 4);
            crore = input.slice(0, 2);
        }

        var hundredString = [],
            thousandString = [],
            lacString = [],
            croreString = [];

        var first, second, third;

        if (crore.length) {
            first = crore[0];
            second = crore[1];
            croreString = setLacAndThousand(first, second, 'crore');
        }

        if (lac.length) {
            first = lac[0];
            second = lac[1];
            lacString = setLacAndThousand(first, second, 'lac');
        }


        if (thousand.length) {
            first = thousand[0];
            second = thousand[1];
            thousandString = setLacAndThousand(first, second, 'thousand');
        }

        if (hundred.length) {
            first = hundred[0];
            second = hundred[1];
            third = hundred[2];
            if (second === '1') {
                hundredString.unshift(digitStartWithOne[second + third]);
            } else {
                hundredString.unshift(digitSingle[third]);
                hundredString.unshift(digitDouble[second]);
            }
            if (first !== '0') {
                hundredString.unshift('hundred');
                hundredString.unshift(digitSingle[first]);
            }
        }

        return croreString.concat(lacString).concat(thousandString).concat(hundredString).join(" ");
    }


    return {
        convert: convertToWords
    };

}
