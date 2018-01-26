const log = (x) => {
    console.log(x);
}
log(window);

const app = document.querySelector(".weather");

const imgs = [
    'dist/imgs/morning.jpg',
    'dist/imgs/noon.jpg',
    'dist/imgs/day.jpg',
    'dist/imgs/night.jpg'
];

const d = new Date();
const timeOfDay = d.getHours();

if(timeOfDay > 6 && timeOfDay < 12){
        app.style.backgroundImage = "url("+imgs[0]+")";
    }else if(timeOfDay > 12 && timeOfDay < 16){
        app.style.backgroundImage = "url("+imgs[1]+")";
    }
    else if(timeOfDay > 16 && timeOfDay < 21){
        app.style.backgroundImage = "url("+imgs[2]+")";
    }else {
        app.style.backgroundImage = "url("+imgs[3]+")";
    }

    

const validateForm = () => {
    const zipCode = document.querySelector("#zipCode");
    if (isNaN(zipCode.value) || zipCode.value == "") {
        alert('You must enter a valid zipcode to continue')
    } else {
        getWeather();
    }
}





const getWeather = () => {
    const http = new XMLHttpRequest();

    http.open('GET', "http://api.wunderground.com/api/cb111489f37f0dc5/conditions/forecast/q/"+zipCode.value+".json");
    http.onload = function(){
        let data = JSON.parse(this.response);
        if (this.status >= 200 && this.readyState == 4){
            
            const container = document.createElement('div');
            container.setAttribute('class', 'container');
            const row = document.createElement('div');
            row.setAttribute('class', 'row'); 
            const area = document.querySelector('.banner');
            area.textContent = data.current_observation.display_location.full;
            let test = data.forecast.txt_forecast['forecastday'];
            test.forEach(day => {
                
                const card = document.createElement('div');
                card.setAttribute('class', 'col-3');

                const dayTime = document.createElement('h2');
                dayTime.textContent = day.title;   

                const cond_img = document.createElement('img');
                cond_img.src = day.icon_url;
                
                const condition = document.createElement('p');
                condition.textContent = day.icon;
                
                const desc = document.createElement('p');
                desc.textContent = day.fcttext;
                
                const rainChance = document.createElement('p');
                rainChance.setAttribute('class', 'chance');
                rainChance.textContent =`Chance of rain : ${day.pop}%`;

                
                app.appendChild(container);
                card.appendChild(cond_img);
                card.appendChild(dayTime);
                
                card.appendChild(desc);
                card.appendChild(rainChance);
                container.appendChild(row);
                row.appendChild(card);  
            });
            
        } else {
            log("App not working");
        }

    }

    http.send();
}

document.querySelector(".btn").addEventListener('click', validateForm);
document.querySelector("#zipCode").addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        validateForm();
    }
});