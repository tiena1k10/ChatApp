const assert = require('assert');
const simsimi = require('simsimi')({
  key: '6uaIjLXATy86Ty98mXD9s1OrJst3Ebnx5ZIbwh0c',
});

const input = 'hello simsimi';

simsimi(input, (err, text, response) => {
  
    console.log(err);
});
