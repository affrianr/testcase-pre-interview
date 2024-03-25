// findMaxSubArray([1, 2, 3, 4, 5, 6]) #input
// $> [1, 2, 3, 4, 5, 6] #output
// $>
// $> findMaxSubArray([2, -3, 2, 4, -3, 5, 2, -5, 2]) #input
// $> [2, 4, -3, 5, 2] #outp

function findMaxSubArray(arr) {
  let max_so_far = Number.MIN_SAFE_INTEGER;
  let max_ending_here = 0;
  let start = 0;
  let end = 0;
  let s = 0;

  for (let i = 0; i < arr.length; i++) {
    max_ending_here += arr[i];

    if (max_so_far < max_ending_here) {
      max_so_far = max_ending_here;
      start = s;
      end = i;
    }
    if (max_ending_here < 0) {
      max_ending_here = 0;
      s = i + i;
    }
  }
  console.log(max_so_far); // nilai total dari sub array
  return arr.slice(start, end + 1);
}

console.log(findMaxSubArray([1, 2, 3, 4, 5, 6]));
console.log(findMaxSubArray([2, -3, 2, 4, -3, 5, 2, -5, 2]));
console.log(findMaxSubArray([8, -2, 6, 1, -6, 3, -4]));
