let time_in_minutes = 10;
let current_time = Date.parse(new Date());
let deadline = new Date(current_time + time_in_minutes*60*1000);

function time_remaining(endtime){
	let t = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
        if(seconds < 10) {
            seconds = '0'+ seconds;
        }
	    return {minutes, seconds};
}
function run_clock(id,endtime){
        let clock = document.getElementById(id);
        let prompt = document.querySelector('.prompt');
        function update_clock(){
           let t = time_remaining(endtime);
            clock.innerHTML = t.minutes+':'+t.seconds;         
                if(t.minutes==0 && t.seconds=="00"){                     
                    clearInterval(timeinterval);
                        prompt.style.display = "block";
                    }
	}
	update_clock(); 
	let timeinterval = setInterval(update_clock,1000);
}
run_clock('timer',deadline);






