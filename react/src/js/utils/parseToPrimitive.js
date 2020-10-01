const parseToPrimitive = (value) => {
  try {
      return JSON.parse(value);
  }
  catch(e) {
      return value;
  }
}

export default parseToPrimitive;