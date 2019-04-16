function learn(Delay = 10, Iterations = 150){
	/*	Ajoute au localStorage des questions
		et l'emplacement de la faute.
		
		Delay: délai entre chaque question en ms
		Iterations: nombre de question enregistrées

		En dessous de 10ms le processus ralenti fortement.

		Il est conseillé de ne pas dépasser 150 itérations pour ne 
		pas avoir à attendre les requêtes trop longtemps.	*/

	var curIter = 1;
	var newQuestions = 0;
	var stop = setInterval(function(){
		if(curIter == Iterations + 1) clearInterval(stop);
		else{
			value = -1;
			question = $('.sentence')[0].textContent;
			sentence = $('.pointAndClickSpan');
			sentence[0].click();
			words = $('.sentence')[0].childNodes;
			
			for(i = 0; i < words.length; i++){
				if(words[i].className == 'answerWord'){
					value = i+1;
					break;
				}
			}
			try {
				if (!localStorage.getItem(question)){ 
					localStorage.setItem(question, value);
					console.log("n°" + curIter + ": New question learned: " + question);
					newQuestions++;
				}
				else console.log("n°" + curIter + ": Already in database, his value is " + value + ". "+newQuestions);
			} catch (error) {
				console.log("couldn't read or write in database");
				error.log(error);
			}
			
			ClosePopUp();
			$('.nextButton')[0].click();
			curIter++;	
		}
	},Delay);
}

function Exo(Delay = 20, Iterarions = 150){
	/* Cherche la question posée dans le localStorage
	pour cliquer sur la faute.
	
	Delay: délai entre les réponses en ms

	Iterations: le nombre maximum de questions résolues
	
		*/

    var curIter = 1;
    var stop = setInterval(function(){
        if(curIter == Iterarions + 1|| $(".trainingEndViewCongrate")[0] != null ) clearInterval(stop);
        else {
            question = $('.sentence')[0].textContent;
            value = -1;
            try {
                value = localStorage.getItem(question);
            } catch (err) {
                console.error(err);
                $('.noMistakeButton')[0].click();
            }
            
            if(value == -1)	$('.noMistakeButton')[0].click();
            else if(!value){
                console.log(curIter + " fail on: " + question);
                $('.noMistakeButton')[0].click();
            }
            else	$('.pointAndClickSpan')[value].click();
        }
        curIter++;
        $('.nextButton')[0].click();
        ClosePopUp();
    },Delay);
    
}

function learnComplete(Delay = 10){
	/*	Cherche la question posée dans la base de donnée pour
		cliquer sur la faute. 
		Le cas échéant, enregistre la nouvelle question 
		et l'emplacement de la faute.
		
		Delay: délai entre chaque question en ms

		En dessous de 10ms le processus ralenti fortement.	*/

	var stop = setInterval(function(){
		if($(".trainingEndViewCongrate")[0] != null) clearInterval(stop);
		question = $('.sentence')[0].textContent;
		try{
			value = localStorage.getItem($('.sentence')[0].textContent);
			console.log(value);
			if(value == -1){
				$('.noMistakeButton')[0].click();
			}
			else{
				$('.pointAndClickSpan')[value].click();	
			}
			
			$('.nextButton')[0].click();
			ClosePopUp();
		}catch(err){
			console.log("catch");
			value = -1;
			sentence = $('.pointAndClickSpan');
			sentence[0].click();
			words = $('.sentence')[0].childNodes;
			for(i = 0; i < words.length; i++){
				if(words[i].className == 'answerWord'){
					value = i+1;
					break;
				}
			}
			console.log("New question learned");
			localStorage.setItem(question, value);
			
			$('.nextButton')[0].click();
			ClosePopUp();
		}
		
	},Delay);	
}

function ModeExam(Delay = 1000){
	/*	Passe automatiquement l'examen Voltaire.

		Delay: délai entre les réponses en ms

		Attention: si le délai est en dessous de 1000ms
		la question n'a pas le temps de changer et le
		programme se comporte de manière inattendue.	*/

    var i = 1;
    var stop = setInterval(function(){
        if($(".noMistakeButton")[0] == null) clearInterval(stop);
        else {
            value = -1;
            try {
                value = localStorage.getItem($('.sentence')[0].textContent);
            } catch (err) {
                console.error(err);
            }
            
            if(value == -1)	{
                $('.noMistakeButton')[0].click();
                console.log("n°" + i + ": No Mistake");
            }
            else if(value === null){
                $('.noMistakeButton')[0].click();
                console.log("===ERROR n°" + i + ": Unknown Question ERROR===");
            }
            else{
                $('.pointAndClickSpan')[value].click();
                console.log("n°" + i + ": Mistake Found");
            }
        }
        i++;
    },Delay);
    
}  

function ModeExam2(Delay = 1000, Score = 100){
	/*	Passe automatiquement l'examen Voltaire.

		Delay: délai entre les réponses en ms
		Score: le pourcentage attendu

		Attention: si le délai est en dessous de 1000ms
		la question n'a pas le temps de changer et le
		programme se comporte de manière inattendue.	
		
		Attention: le score ne fonctionne pas, car le
		pourcentage de réussite est calculé sur le nombre
		de "règles apprises" et non le nombre de 
		faute commises.	*/
	
	var nbrMistakes = 0;
	var mistakesLeft = (100 - Score) * 2.8;
    var i = 1;
    var stop = setInterval(function(){
        if($(".noMistakeButton")[0] == null) clearInterval(stop);
		else if (i >= 280 - mistakesLeft){
			$('.pointAndClickSpan')[0].click();
			console.log("n°" + i + ": Tactic Mistake");
			mistakesLeft--;
		}
        else {
			
            value = -1;
            try {
                value = localStorage.getItem($('.sentence')[0].textContent);
            } catch (err) {
                console.error(err);
            }
            
            if(value == -1)	{
                $('.noMistakeButton')[0].click();
                console.log("n°" + i + ": No Mistake");
            }
            else if(value === null){
				nbrMistakes++;
                $('.noMistakeButton')[0].click();
				console.log("===ERROR==n°" + i + ": Unknown=Question=("+ nbrMistakes+")=ERROR===");
				mistakesLeft--;
            }
            else{
                $('.pointAndClickSpan')[value].click();
                console.log("n°" + i + ": Mistake Found");
            }
		}
		console.log(mistakesLeft);
        i++;
    },Delay);
    
}

function ClosePopUp(){
	/* Ferme les pop-up qui peuvent apparaître après un exercice*/

    $('.popupPanel').css('display','none');
    $('.dialogBackground').css('display','none');
}