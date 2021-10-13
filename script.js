
//Dark - Light theme logic
const $themeBtn = document.querySelector('.theme');
const $themeText = document.getElementById('theme-text');

const getCurrentTheme=() => {
    let theme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches ?  'dark' : 'light';
    localStorage.getItem('devfinder.theme') ? theme = localStorage.getItem('devfinder.theme') : null
return theme}

function loadTheme(theme) {
    const root = document.querySelector(':root')
 console.log($themeBtn)
    if (theme== 'light') {
        $themeText.innerHTML = "DARK"
    }
    else {
        $themeText.innerHTML = "LIGHT"
    }
    root.setAttribute('color-scheme', `${theme}`)
    }

$themeBtn.addEventListener('click', () => {
    console.log('btn event listener')
    let theme = getCurrentTheme()
    if (theme === 'light') {
        theme = 'dark'
    }
    else if  (theme === 'dark') {
        theme = 'light'}
    localStorage.setItem('devfinder.theme' , `${theme}`);
    loadTheme(theme)
})

window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getCurrentTheme())
})

//Fetching users and updating dom logic
const $searchInput = document.getElementById('search-input')
const $searchBtn = document.getElementById('search-button')
const $form = document.getElementById('form')

const $public_repos = document.getElementById('public_repos')

//Helper function removing optional @ from company name

const checkString = (str)  =>{
    if (str.startsWith("@")) {
      str = str.substring(1)
      return str
    }
    else {return str}
  }
  

document.querySelector("#search-button").addEventListener("click", async function(event) {
     event.preventDefault();
     let username = $searchInput.value
      updateDom(username)
     


}, false);

const updateDom = async(username) => {
    if (!username) {
        handleError();
        return
    }
    try{
        await fetch(`https://api.github.com/users/${username}`)
         .then( x => x.json())
         .then(data => {
if (data.login) {
    const {name, bio, location, company, blog, twitter_username, created_at, avatar_url, public_repos, followers, following} = data
    let d = new Date(created_at)
    $form.classList.remove('special')

          document.getElementById('name').innerText  = name? name : username 
          document.getElementById('profile-description').innerText  = bio? bio :  'This profile has no bio' 
          document.getElementById('created_at').innerText = created_at? 'Joined at ' + d.toDateString().split(',').toString().slice(4) :  'Not available' 
          document.getElementById('avatar').src = avatar_url 
          document.getElementById('public_repos').innerText  = public_repos? public_repos :  0
          document.getElementById('followers').innerText  = followers? followers  :  0
          document.getElementById('following').innerText  = following? following :  0
          document.getElementById('city').innerText  = location ? location  : 'Not available' 
          document.getElementById('username').innerText  = '@' + username
        
        if (twitter_username) {
            document.getElementById('twitter_username').innerHTML  = '@' + twitter_username 
            document.getElementById('twitter_username').parentElement.classList.remove('text-opacity')

        }
        else {
            console.log(document.getElementById('twitter_username'))
            document.getElementById('twitter_username').innerHTML = 'Not available' 
            document.getElementById('twitter_username').parentElement.classList.add('text-opacity')
        }

        if (company) {
            //code doesn't  check if link is valid -  it is just doing what the task is asking for
            //TODO
            let companyPure = checkString(company)
            document.getElementById('company').innerHTML  = companyPure
            document.getElementById('company').href  = `https://github.com/${companyPure}`
            document.getElementById('company').parentElement.classList.remove('text-opacity')

        }
        else {
            document.getElementById('company').innerHTML = 'Not available' 
            document.getElementById('company').parentElement.classList.add('text-opacity')
        }

        if (blog) {
            document.getElementById('blog').innerHTML  = blog
            document.getElementById('blog').href  = blog
            document.getElementById('blog').parentElement.classList.remove('text-opacity')

        }
        else {
            console.log(document.getElementById('blog'))
            document.getElementById('blog').innerHTML = 'Not available' 
            document.getElementById('blog').parentElement.classList.add('text-opacity')
        }

      }
      else {
          handleError()
      }

}       
         )}
      catch (err) {
      console.error(err)
      }
    }


    const handleError = () => {
        $form.classList.add('special')
        }

 window.addEventListener('DOMContentLoaded', () => {
    updateDom('octocat')
})

