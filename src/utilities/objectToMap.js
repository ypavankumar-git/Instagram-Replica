const ConvertObjectToMap = (arr) => {
  let output = [];

  arr.map((feedObject) => {
    const resultMap = new Map();
    Object.keys(feedObject).map((key) => {
      resultMap.set(key, feedObject[key]);
    });
    output.push(resultMap);
  });
  return output;
};

export default ConvertObjectToMap;

// const ConvertObjectToMap = (object) => {
//   console.log(object);
//   let arr = [];
//   Object.keys(object).map((feed) => {
//     const resultMap = new Map();
//     const feedObject = object[feed];
//     Object.keys(feedObject).map((feed) => {
//       resultMap.set(feed, feedObject[feed]);
//     });
//     arr.push(resultMap);
//   });
//   console.log(arr);
//   return arr;
// };

// export default ConvertObjectToMap;
