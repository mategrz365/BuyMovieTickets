document.addEventListener('DOMContentLoaded', function(){
  let display_el = document.querySelector('.display');
  let logo = document.querySelector('.logo_left');

    display_el.addEventListener('scroll', function() {        
       if (display_el.scrollTop > 50){
            logo.style.opacity = '0';
               if(document.querySelector('.btn.logout')) {
                    document.querySelector('.btn.logout').style.opacity = '0';
               }
       } else {
            logo.style.opacity = '1';
            if(document.querySelector('.btn.logout')) {
               document.querySelector('.btn.logout').style.opacity = '1';
          }
       }
    })
});