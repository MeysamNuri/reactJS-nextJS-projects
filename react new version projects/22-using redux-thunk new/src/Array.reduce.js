//Array.reduce()

const numbers = [2, 5, 8, 10];

const addNumbers = (previousResult, currentItem) => {
    console.log({ previousResult, currentItem });
    return previousResult + currentItem;
};

const initialValue = 0;

const total = numbers.reduce(addNumbers, initialValue);

console.log(total);
