var date = new Date();
var today = date.getDate();
var todayDOfW = date.getUTCDay();
var month = date.getMonth();
var year = date.getFullYear();

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var dOfW = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

//check for number of days in the month

function updateSchdDate(dW, m, d) {
    document.querySelector('.schedule__title--date').innerHTML = dOfW[dW] + ", " + months[m] + " " + d;
}

function updateMonth(m) {
    document.querySelector('.calender__month--text').innerHTML = months[m];
}

(function monthCheck(month, day, dayOfWeek){
    
    updateMonth(month);
    updateSchdDate(dayOfWeek, month, day);
    
    var daysInM, daysInMBefore;
    if (month < 7) {
        if (month == 1) { //february
            if (year % 4 == 0){ //leap year
                daysInM = 29;
                daysInMBefore = 31;
            } else {
                daysInM = 28;
                daysInMBefore = 31;
            }
        } else {
            daysInM = 30 + (month+1)%2;
            daysInMBefore = 30 + month%2;
        }
    } else {
        daysInM = 30 + month%2;
    }
    
    var calenderDays = document.querySelector('.calender__days');
    var smDay = 1; //same month day
    while (smDay <= daysInM) {
        var dayCell = document.createElement('div');
            dayCell.className = 'calender__cell calender__cell--d';
            dayCell.addEventListener("click", function(e){
                if (!this.classList.contains('active')){
                    var cActive = document.querySelector('.active');
                            cActive.querySelector('.active').classList.remove('active');
                            cActive.classList.remove('active');
                    this.classList.add('active');
                    this.querySelector('p').classList.add('active');
                    var cDay = String(this.querySelector('p').innerHTML);
                    var cDOfW = (String(this.querySelector('p').innerHTML) - today)%7 + todayDOfW;
                    if (cDOfW < 0) {
                         cDOfW += 7;
                    }
                    updateSchdDate(cDOfW, month, cDay);
                }
            }, false);
            var dayCellText = document.createElement('p');
                dayCellText.className = 'calender__text--d';
                dayCellText.innerHTML = smDay;
                if (smDay == today){
                    dayCell.classList.add('active');
                    dayCellText.classList.add('active');
                }
            dayCell.append(dayCellText);

        calenderDays.append(dayCell);
        smDay++;
    }
    
})(month, today, todayDOfW);

function nextMonth() {
    month++;
}

function addTask(e) {
    e.classList.toggle('active');
    e.querySelector('i').classList.toggle('active');
    var form = document.querySelector(".schedule__form");
    var check = form.classList.contains('show');
    var fChild = form.children;
    var pos = 0;
    if (check) {
        
        for (var element of fChild){
            togContent(element, pos);
            pos++;
        }
        
        setTimeout(function() {
            form.classList.toggle('show');
            e.onclick = addTask(this);
        }, 50 * pos + 500);
        
    } else {
        form.classList.toggle('show');
        
        setTimeout(function() {
            for (var element of fChild){
                togContent(element, pos);
                pos++;
            }
            e.onclick = addTask(this);
        }, 500);
        
    }
}

function togContent(elem, pos) {
    setTimeout(function() {
        elem.classList.toggle('show');
    }, 50 * pos);
}

// 방123성훈이 짜기 시작한 코드

// var newEl = scheduleWrapper.createElement('p');

onload = function () {
  let currentURL = location.protocol + "//" + location.host;
  let scheduleWrapper = document.querySelector(".schedule__formWrapper");

    let days = document.querySelectorAll(".calender__cell--d");

    for (let day of days) {
        day.addEventListener("click", function () {

            console.log("asshole");
            
            let dayText = day.textContent;

            let titlesText = [];
            let startTimeText = [];
            let endTimeText = [];
            let contentsText = [];

            path = fetch(currentURL + "/api/date/2018/12/" + dayText, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                body: undefined
                //JSON.stringify({})
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJSON) {
              scheduleWrapper.textContent = '';
                for (let i = 0; i < myJSON.titles.length; i++) {
                    //이 반복문은 잘 돌아감!

                    console.log(scheduleWrapper.textContent );

                    console.log(i);
                    titlesText[i] = myJSON.titles[i];
                    startTimeText[i] = myJSON.start_times[i];
                    endTimeText[i] = myJSON.end_times[i];
                    contentsText[i] = myJSON.texts[i];
                    
                    console.log(myJSON.titles[i]);
                  
                    document.querySelector(".schedule__formWrapper").innerHTML += "<b># " + titlesText[i] + "</b><br/>";
                    document.querySelector(".schedule__formWrapper").innerHTML += "<span class='time'>" + startTimeText[i] + " ~ " + "</span>";
                    document.querySelector(".schedule__formWrapper").innerHTML += "<span class='time'>" + endTimeText[i] + "</span><br>";
                    document.querySelector(".schedule__formWrapper").innerHTML += contentsText[i] + "<hr style=\"width: 100%; color: aqua;\">";

                    // var newEl = document.createElement('p');
                    // newEl.appendChild(document.createTextNode(titlesText[i]));
                    // scheduleWrapper.appendChild(newEl);
                }
                
            })
            /*
            setTimeout(3000);
            //여기까지 잘됨console.log(i+"번째");
            for (let i = 0; i < titlesText.length; i++) {
                
                scheduleWrapper = '';
                scheduleWrapper += "<b># " + titlesText[i] + "</b>";
                scheduleWrapper += "<span class='time'>→" + startTimeText[i] + "<br>";
                scheduleWrapper += "←" + endTimeText[i] + "</span><br>";
                scheduleWrapper += "=" + contentsText[i] + "<hr>";
            }
            */
        })
    }
}