const allUsers = document.querySelector('.users')
const newuser = document.querySelector('#newuser')
const btn = document.querySelector('button')
const namex = document.querySelector('#name')
const email = document.querySelector('#email')

async function getusers() {
   const response = await fetch('http://localhost:3000')
   const users = await response.json()
   for (let i = 0; i < users.length; i++){
        const div = document.createElement('div')
        div.classList.add(`user`)
        div.textContent = 'name: ' + users[i].name + '  email: ' + users[i].email;
        allUsers.appendChild(div)
   }
       // .then(function(response) {
       //   return response.json();
       // })
       // .then(function(response) {
       //   console.log(response);
       // });
}
async function addUser(x, y){
    if(namex != '' || email != ''){return}
    await fetch(`http://localhost:3000?name=${x}&email=${y}`, {method: 'post',
        headers: {
                'Content-Type': 'application/json',
            },
    })
   // const user = await response.json()
   // console.log(user)
   // return user
}
getusers()
//addUser()
btn.addEventListener('click', async () => {
    let x = namex.value
    let y = email.value
    if( x == undefined || y == undefined){return}
    await addUser(x, y)
    console.log(x)
    const div = document.createElement('div')
    div.classList.add(`user`)
    div.textContent = 'name: ' + x + '  email: ' + y;
    allUsers.appendChild(div)
})
