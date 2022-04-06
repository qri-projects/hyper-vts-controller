function gen(apply, value) {
  let emotions = {
    ">_<": "emoVV",
    "OvO": "emoOvO",
    "FuFu": "emoFuFu"
  }
  if (value == "默认") {
    return;
  }
  for (let emotionsKey in emotions) {
    if (emotionsKey === value) {
      apply(emotions[emotionsKey], 1)
    } else {
      apply(emotions[emotionsKey], 0)
    }
  }
}