setTimeout(() => {
  console.log('Do something after 2 secs')
}, 2000)


const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    }

    callback(data);
  }, 2000)
}

geocode('Philly', (data) => {
  console.log(data)
})

const add = (a, b, callback) => {
  callback(a+b)
};

setTimeout(() => {
  add(1,4, (res) => {
    console.log(res)
  })
}, 2000)

