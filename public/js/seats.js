document.addEventListener("DOMContentLoaded", function(){
    let btn_post = document.getElementById('btn_post');
    let data = {};

    btn_post.addEventListener('click', function(){             
        fetch("http://localhost:3000/summary", {
            method: "post",
            headers: {'Accept': 'application/json',
                        'Content-Type': 'application/json'},                        
            body: JSON.stringify({data})       
        })
        .then(res => 
            res.text()
        .then(text => {
            console.log(text);
            document.write(text)}
           ))           
    });
       
    seats.addEventListener('click', function(e){
        if (e.target.nodeName == 'I'){
            e.target.classList.toggle('clicked');     
            sumPrize(sumSeats());
        }       
    })

        function sumPrize(selectedSeats){
            let price = document.getElementById('price');
            let ticket_price = 15.00;      
            let sum = selectedSeats * ticket_price; 
                data.sum = sum;
                price.innerText = `Cena biletu: ${sum} PLN`;
        }

        (function createSeats(){
            let seats = document.getElementById('seats');
            for (let i = 1; i <=cinema_rows; i++){
                let span_parent = document.createElement('div');
                span_parent.classList.add('row');
                seats.appendChild(span_parent);
                    for (let j = 1; j<= cinema_columns; j++){    
                        let span = document.createElement('span');
                        span.classList.add('seat');
                        // let value = "rz:" + i + "m:" + j;                                
                        span.innerHTML = '<i class="fas fa-chair"></i>'; 
                        span_parent.appendChild(span);                      
                    }   
            }
        })();

        function sumSeats(){
            let selectedSeats = 0;
            let cinema_seats = document.querySelectorAll('.fa-chair');
            cinema_seats.forEach(seat => {
                if(seat.className === 'fas fa-chair clicked'){
                    selectedSeats++;            
                }       
            })
            data.seats = selectedSeats;
            return selectedSeats;
        }
});