#!/usr/bin/env node
const assert = require('assert');

// test data
const badInput = 8
const emptyInput = []
const array1In = [1, 2, 3]
const array1Out = [1, 2, 3]
const array2In = [4, 5, [6, 7]]
const array2Out = [4, 5, 6, 7]
const array3In = [8, 9, [10, 11, [12, 13]]]
const array3Out = [8, 9, 10, 11, 12, 13]
var index = 0
var bigArray = []
while (index  < 100000000) { // one hundred million
  bigArray.push(index++)
}

// flattens arrays
const flatten = (array) => {
  if(!Array.isArray(array)) {
    console.log('invalid data, must be a valid array')
    return -1
  }
  let flattened = []
  array.forEach((e) => {
    if (Array.isArray(e)) {
      flattened = flattened.concat(flatten(e))
    } else {
      flattened.push(e)
    }
  });
  return flattened
}

// test input data

// not an array
var flattened = flatten(badInput)
assert(flattened == -1)

// empty array
flattened = flatten(emptyInput)
assert.deepEqual(flattened, [])

// stress test, breaks at a billion on my laptop
flattened = flatten(bigArray)
assert.deepEqual(flattened, bigArray)

flattened = flatten(array1In)
assert.deepEqual(flattened, array1Out)

flattened = flatten(array2In)
assert.deepEqual(flattened, array2Out)

flattened = flatten(array3In)
assert.deepEqual(flattened, array3Out)

process.exit()
