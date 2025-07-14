function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
  
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          // If the value is an object, recurse into it
          flattenObject(obj[key], newKey, result);
        } else {
          // Otherwise, store the value with the new key
          result[newKey] = obj[key];
        }
      }
    }
  
    return result;
  }
  
  const response = {
    name: 'Manu',
    age: 21,
    characteristics: {
      height: '6 feet',
    },
    techStack: {
      language: 'Javascript',
      framework: {
        name: 'Nextjs',
        version: '12',
      },
    },
  };
  
  const flattenedResponse = flattenObject(response);
  console.log(flattenedResponse);
  