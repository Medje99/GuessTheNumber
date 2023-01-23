let digits = $('#digits');
let time = $('#time');
let generateNum = $('.btn__one');
let guessBtn = $('.btn__two');
let guessNum = $('.number__guess')
let givenNum = $('.number__active > span')
let score = $('#scorenumber');
let maxScore = $('#maxScore');
let lastNum = $('.lastNum > span');
let rules = $('.rules');



digits.on('change', function(){
    var num = digits.val();
    var stars = "";
    for (var i = 0; i < num; i++) {
        stars += "*";
    }
    givenNum.text(stars);
});


let selectedTime = time.val();


time.on('change', function (){ //When you select the display time of digits
selectedTime =  time.val();
});


function hideNum() {
    givenNum.css('visibility','hidden') 
    }

function showNum(){
    givenNum.css('visibility','visible') 
    }
   


generateNum.on('click',function getNum(){ //When you click 'Generate a number' btn
    generateNum.css('pointer-events','none')
    guessNum.prop('disabled', false);
    score.removeAttr('class')
    $('.number__guess').focus();    

    if(lastNum.hasClass("colorChange__lastNum_red")){ 
        lastNum.removeClass("colorChange__lastNum_red") 
     }else{
        lastNum.removeClass("colorChange__lastNum_green")
     }


const ranges = {
    '3': [100, 999],
    '4': [1000, 9999],
    '5': [10000, 99999],
    '6': [100000, 999999],
    '7': [1000000, 9999999]
};

const selectedRange = ranges[digits.val()];
givenNum.text(Math.floor(Math.random() * (selectedRange[1] - selectedRange[0] + 1) ) + selectedRange[0]);




setTimeout(() => {//This will hide a shown number after the display time that you selected expires
    hideNum()
    guessBtn.css('pointer-events','all')
  }, selectedTime)

    
   

});



let sc = 0;
let getMaxNum = localStorage.getItem('counter') //the highest score you have will be stored in this variable
maxScore.text(getMaxNum) //maxScore that is shown on screen will get highest score you have



guessBtn.on('click',function (){ //This will execute when you click 'Submit a number' btn
    generateNum.css('pointer-events','all')
    showNum()


    let size = givenNum.text().length;
    let yourGuess = guessNum.val();
    let numberToGuess = givenNum.text();

    const wrong = {
        3:4,
        4:2,
        5: 1,
        6:0.5,
        7:0.25,
    }

    const correct = {
        3: 0.25,
        4: 0.5,
        5: 1,
        6: 2,
        7: 4,
    }
    

    if(yourGuess == ""){
        alert('Insert a number')
        guessBtn.css('pointer-events','all')
        guessNum.prop('disabled',false)
        generateNum.css('pointer-events','none')
        hideNum()
        return;
   
    }else if(yourGuess !== numberToGuess){
        guessBtn.css('pointer-events','none')
        
        sc -= wrong[size]
        score.text(`${sc}`);
 
        score.addClass("colorChange__red")
        lastNum.text(numberToGuess).addClass("colorChange__lastNum_red")

    }else if(yourGuess === numberToGuess){
        guessBtn.css('pointer-events','none')
        guessNum.prop('disabled',true)
      
        sc += correct[size]
        score.text(`${sc}`);

        score.addClass("colorChange__green")
        lastNum.text(givenNum.text()).addClass("colorChange__lastNum_green")

    }

    if(sc > getMaxNum) { 
        localStorage.setItem('counter',sc)
        maxScore.text(localStorage.getItem('counter')) 
    }


    // $('.btn__one').focus() this will focus 'Generate a number' btn
    $('.btn__two').blur()
    givenNum.text('')
    guessNum.val('')
    guessNum.prop('disabled',true)

});    

rules.on('click',function(){
    alert('Correct guess:\n3 digits = +0.25\n4 digits = +0.5\n5 digits = +1\n6 digits = +2\n7 digits = +4')
    alert('Incorrect guess:\n3 digits = -4\n4 digits = -2\n5 digits = -1\n6 digits = -0.5\n7 digits = -0.25')    
})


