
var timeout;

/*used main here because it contains all divs of website do we 
 we have to apply smooth scrolling on main div*/

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'), 
    smooth: true
});


function firstPgAnim(){

    var t1 = gsap.timeline();

    t1.from("#nav",{

        y: '-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut

    })

    .to(".boundingelem",{
        y:"0",
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2 // stagger means the delay between animation of two elements 
        //i.e. elem1 start its animation after 2 sec but elem2 will start its animation in 2.2 sec (.2sec is stagger)
    })

    .from("#herofooter",{

        y:"-10",
        opacity:0,
        duration:2,
        delay:-1,
        ease:Expo.easeInOut


    });


}



function circleSkew(){

    // define default scale values

    var xScale = 1;
    var yScale = 1;

    var xPrev = 0;
    var yPrev = 0;


    window.addEventListener("mousemove", function (details){

        clearTimeout(timeout);

       // var xDiff = details.clientX - xPrev;
       // var yDiff = details.clientY - yPrev;

 

        xScale = gsap.utils.clamp(.8,1.2,details.clientX - xPrev); /* clamp method adjust xdiff and ydiif between 0.8 to 1.2*/ 
        yScale = gsap.utils.clamp(.8,1.2,details.clientY - yPrev);


        xPrev = details.clientX;
        yPrev = details.clientY;

        circleMove(xScale,yScale);

        // below function is written to make circle to its normal shape when mouse movement stops

        timeout = setTimeout(function (){
            document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1,1)`;
        },100)



    });



}



function circleMove(xScale,yScale){

    window.addEventListener('mousemove',(details)=>{

        document.querySelector('#minicircle').style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xScale}, ${yScale})`;



    });


}



document.querySelectorAll(".elem").forEach((elem)=>{

    var diffrot = 0;
    var rotate = 0;


    elem.addEventListener("mouseleave",(details)=>{
        


        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:.5
        });


    });





    elem.addEventListener("mousemove",(details)=>{
        
        var diff = details.clientY - elem.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:details.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        });





    });




});





circleSkew();
circleMove();
firstPgAnim();