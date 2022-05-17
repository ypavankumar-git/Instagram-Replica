const ConvertObjectToMap = (arr) => {
  const output = [];

  arr.map((feedObject) => {
    const resultMap = new Map();
    Object.keys(feedObject).map((key) => resultMap.set(key, feedObject[key]));
    return output.push(resultMap);
  });
  return output;
};

export default ConvertObjectToMap;
