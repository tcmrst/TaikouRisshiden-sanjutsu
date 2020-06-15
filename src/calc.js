class Token {
  constructor(operators, isMinus) {
    this.operators = operators;
    this.flag = isMinus ? -1 : 1;
    this.numberSize = operators ? (operators.length + 1) : 1;
  }

  calculate(numbers) {
    if (numbers.length !== this.numberSize) {
      throw new Error('入力された' + numbers + 'と' + this.operators + 'の数が合いません');
    }

    var acc = numbers[0];
    for (var i = 1; i < numbers.length; i++) {
      switch (this.operators[i-1]) {
        case '*':
          acc *= numbers[i];
          break;
        case '/':
          acc /= numbers[i];
          break;
        default:
          throw new Error('対応していないオペレーター:' + this.operators[i-1]);
      }
    }

    return acc * this.flag;
  }
}

class Calculator {
  constructor(tokens) {
    this.tokens = tokens;
    this.numberSize = tokens.reduce((acc, value) => acc + value.numberSize, 0);
  }

  calculate(numbers) {
    if (numbers.length !== this.numberSize) {
      throw new Error('入力の数が合いません:' + this.numberSize);
    }

     var acc = 0;
     var numberIndex = 0;

     for (var i = 0; i < this.tokens.length; i++) {
       var token = this.tokens[i];
       acc += token.calculate(numbers.slice(numberIndex, numberIndex + token.numberSize));
       numberIndex += token.numberSize;
     }

     return acc;
  }
}

function tokenize(operators) {
  var chunk = '';
  var isMinus = false;
  var tokens = [];

  function createToken() {
    return new Token(chunk, isMinus);
  }

  for (var i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case '*':
      case '/':
        chunk += operators[i];
        break;

      case '-':
      case '+':
        tokens.push(createToken());
        chunk = '';
        isMinus = operators[i] === '-';
    }
  }
  tokens.push(createToken());

  return tokens;
}

// https://qiita.com/kanpou0108/items/b6c7a38a755dd60fd77f ありがとう！
const permutation = ({ result = [], pre = [], post, n = post.length }) => {
  if (n > 0) {
    post.forEach((_, i) => {
      const rest = [...post];
      const elem = rest.splice(i, 1);
      permutation({ result, pre: [...pre, ...elem], post: rest, n: n - 1});
    });
  } else {
    result.push(pre);
  }
  return result;
};

export function calculate(operators, solution) {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  var calculator = new Calculator(tokenize(operators));

  const perm = permutation({ post: array, n: calculator.numberSize });
  for (var i = 0; i < perm.length; i++) {
    if (calculator.calculate(perm[i]) === solution) {
      return perm[i];
    }
  }
  return null;
}
