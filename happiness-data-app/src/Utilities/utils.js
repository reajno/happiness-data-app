const queryUtils = {
  toHyphen(string) {
    return string.trim().toLowerCase().replace(/\s+/g, "-");
  },
  toWhiteSpace(string) {
    return string.replace(/-/g, " ");
  },
};

export default queryUtils;
