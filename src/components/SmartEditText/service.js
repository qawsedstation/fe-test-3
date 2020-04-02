const submitEditText = text => {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (text === "success") {
        resolve({ success: true });
      } else {
        reject({msg: 'Oops something went terrible wrong!'})
      }
    }, 3000);
  });
};

export default submitEditText;
