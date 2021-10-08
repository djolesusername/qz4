
//Dark - Light theme logic
let $themeBtn = document.querySelector('.theme');

const getCurrentTheme=() => {
    let theme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches ?  'dark' : 'light';
    localStorage.getItem('devfinder.theme') ? theme = localStorage.getItem('devfinder.theme') : null
return theme}

function loadTheme(theme) {
    const root = document.querySelector(':root')
    if (theme== 'light') {
       console.log('lighttheme') }
    else {
    console.log('darktheme')
    }
    root.setAttribute('color-scheme', `${theme}`)
    }

$themeBtn.addEventListener('click', () => {
    console.log('btn event listener')
    let theme = getCurrentTheme()
    localStorage.setItem('devfinder.theme' , `${theme}`);
    loadTheme(theme)
})

window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getCurrentTheme())
})

//Fetching users and updating dom logic
const $searchInput = document.getElementById('search-input')
const $searchBtn = document.getElementById('search-button')

const $public_repos = document.getElementById('public_repos')

document.querySelector("#search-button").addEventListener("click", async function(event) {
     event.preventDefault();
      let username = $searchInput.value
      
      try{
          await fetch(`https://api.github.com/users/${username}`)
           .then( x => x.json())
           .then(data => {
         const {name, bio, login, location, company, blog, twitter_username, created_at, avatar_url, public_repos, followers, following} = data
     
            document.getElementById('name').innerText  = name? name : 'Not available' 
            document.getElementById('profile-description').innerText  = bio? bio : 'Not available' 
            document.getElementById('blog').innerText  = blog? blog :  'Not available' 
            document.getElementById('created_at').innerText  = created_at? created_at :  'Not available' 
            document.getElementById('avatar').src = avatar_url 
          document.getElementById('public_repos').innerText  = public_repos? public_repos :  'Not available' 
          document.getElementById('followers').innerText  = followers? followers  :  'Not available' 
          document.getElementById('following').innerText  = following? following :  'Not available' 
          document.getElementById('company').innerText  = company? company : 'Not available' 
          document.getElementById('city').innerText  = location ? location  : 'Not available' 
          document.getElementById('twitter_username').innerText  = twitter_username? twitter_username : 'Not available' 
          document.getElementById('username').innerText  = username
        }
           )}
        catch (err) {
        console.error(err)
        }


}, false);


/* window.addEventListener('DOMContentLoaded', () => {
    searchUser('octocat')
})

*/