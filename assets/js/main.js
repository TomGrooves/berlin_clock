// Interval to update the clock
setInterval(() => {
    setClock();
}, 1000);

// Function to return time (takes string as param with keywords "min" or "hour")
function getTime(param){

    let time = new Date;
    let min = "0" + time.getMinutes()
    let hour = "0" + time.getHours()
    let h = hour.slice(-2);
    let m = min.slice(-2);
    let strTime = `${h}:${m}`;

    if (param == "min"){ return m;}

    if (param == "hour"){ return h;}

    else if (param == "" || param == undefined || param == null){
        return strTime;
    }
}

// Function to set the clock state
function setClock(){
    let clock = document.getElementsByClassName('clock-grid');
    let clock_components = clock[0].children;
    let clock_head = document.getElementById('clock-head');
    let h = getTime("hour");
    let m = getTime("min");
    
    let h5 = Math.floor(h/5);
    let m5 = Math.floor(m/5);
    let h5_remain = h%5;
    let m5_remain = m%5;
    
    clock_head.classList.toggle('active')
    
    for (var x = 0; x < clock_components.length; x++){
        for (var y = 0; y < clock_components[x].children.length; y++){
            clock_components[x].children[y].style.backgroundColor = "gray";
     
            for (var hour_count = 0; hour_count < h5; hour_count++){
                clock_components[0].children[hour_count].style.backgroundColor = "red";
            }
            for (var hour_single = 0; hour_single < h5_remain; hour_single++){
                clock_components[1].children[hour_single].style.backgroundColor = "red";
            }
            for (var min_count = 0; min_count < m5; min_count++){
                clock_components[2].children[min_count].style.backgroundColor = "red";
            }
            for (var min_single = 0; min_single < m5_remain; min_single++){
                clock_components[3].children[min_single].style.backgroundColor = "red";
            }
        }
    }
}

// Function to fetch a wiki article about the clock and display its content
async function getInfo(){
    let url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&titles=Mengenlehreuhr&redirects=true&utf8=&format=json"
    let response = await fetch(url);
    let text = await response.json();
    let container = document.getElementById("info");
    let textString = "<h2>"+ text.query.pages[28762298].title + "</h2><br>" + text.query.pages[28762298].extract;
    container.innerHTML = textString.substr(0, 2982);
}

getInfo();