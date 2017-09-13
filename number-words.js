var a = "52122";
var digitSingle = {
    '0': null,
    '1': "One",
    '2': "Two",
    '3': "Three",
    '4': "Four",
    '5': "Five",
    '6': "Six",
    '7': "Seven",
    '8': "Eight",
    '9': "Nine"
};

var digitDouble = {
    '2': "Twenty",
    '3': "Thirty",
    '4': "Forty",
    '5': "Fifty",
    '6': "Sixty",
    '7': "Seventy",
    '8': "Eighty",
    '9': "Ninety"
};

var digitStartWithOne = {
    '10': 'Ten',
    '11': 'ELEVEN',
    '12': 'TWELVE',
    '13': 'THIRTEEN',
    '14': 'FOURTEEN',
    '15': 'FIFTEEN',
    '16': 'SIXTEEN',
    '17': 'SEVENTEEN',
    '18': 'EIGHTEEN',
    '19': 'NINETEEN'
};

var input = a.toString().split("");
var inputLength = input.length;

console.log(input, inputLength);

var hundred = [];
var thousand = [];
var lac = [];

if (inputLength < 3) {
    for (var i = 0; i < 3 - inputLength; i++) {
        input.unshift("0");
    }
} else if (inputLength > 3 && inputLength < 5) {
    input.unshift("0");
} else if (inputLength > 5 && inputLength < 7) {
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
}

var hundredString = [];
var thousandString = [];


if (lac.length) {

}

if (thousand.length) {
    var first = thousand[0];
    var second = thousand[1];
    thousandString.unshift('thousand');
    if (first === '0') {
        thousandString.unshift(digitSingle[second]);
    } else {
        if (first === '1') {
            thousandString.unshift(digitStartWithOne[first + second]);
        } else {
            thousandString.unshift(digitSingle[second]);
            thousandString.unshift(digitDouble[first]);
        }
    }
}

if (hundred.length) {
    var first = hundred[0];
    var second = hundred[1];
    var third = hundred[2];
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


console.log(thousandString.concat(hundredString).join(" "));
