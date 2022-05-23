const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgloc = document.querySelector('#messageloc')
const msg = document.querySelector('#message')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const locstring = location.toString
    console.log(location)

    msgloc.textContent = ' '
    msg.textContent = 'Loading...'
    


fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgloc.textContent = 'Error'
            msg.textContent = data.error

        }
        else {
            msgloc.textContent = data.location
            msg.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)


        }
    })

})

})
/*
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
})*/
