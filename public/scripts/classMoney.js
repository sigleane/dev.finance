let fiado = document.querySelector('#fiado');
let recebido = document.querySelector('#recebido');
let gasto = document.querySelector('#gasto');

fiado.addEventListener('click',function(){
    if(recebido.hasAttribute("class")){
        recebido.classList.remove('recebido') 
    }
    
    if(gasto.hasAttribute('class')){
        gasto.classList.remove('gasto')
    }


    if(fiado.classList.contains('fiado')){
        fiado.classList.remove('fiado')
    }else{
        fiado.classList.add('fiado')
       
    }


}) 

recebido.addEventListener('click',function(){
    if(fiado.hasAttribute("class")){
        fiado.classList.remove('fiado') 
    }
     if(gasto.hasAttribute('class')){
        gasto.classList.remove('gasto')
    }

    
    if(recebido.classList.contains('recebido')){
        recebido.classList.remove('recebido')
    }else{
        recebido.classList.add('recebido')
       
    }


}) 


gasto.addEventListener('click',function(){
    if(fiado.hasAttribute("class")){
        fiado.classList.remove('fiado') 
    }
     if(recebido.hasAttribute('class')){
        recebido.classList.remove('recebido')
    }

    
    if(gasto.classList.contains('gasto')){
        gasto.classList.remove('gasto')
    }else{
        gasto.classList.add('gasto')
       
    }


}) 