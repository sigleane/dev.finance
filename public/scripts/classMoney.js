let fiado = document.querySelector('#fiado');
let recebido = document.querySelector('#recebido');
let gasto = document.querySelector('#gasto');


fiado.addEventListener('click',function(){
    if(recebido.classList.contains('recebido')){
        recebido.classList.remove('recebido') 
        fiado.classList.toggle('fiado')
    }else if(gasto.classList.contains('gasto')){
        gasto.classList.remove('gasto')
        fiado.classList.toggle('fiado')
    }else{
        fiado.classList.toggle('fiado')
    }
    
    
}) 

recebido.addEventListener('click',function(){
    if(fiado.classList.contains('fiado')){
        fiado.classList.remove('fiado') 
        recebido.classList.toggle('recebido')
    }else if(gasto.classList.contains('gasto')){
        gasto.classList.remove('gasto')
        recebido.classList.toggle('recebido')
    }else{
        recebido.classList.toggle('recebido')
    }


}) 


gasto.addEventListener('click',function(){
    if(recebido.classList.contains('recebido')){
        recebido.classList.remove('recebido') 
        gasto.classList.toggle('gasto')
    }else if(fiado.classList.contains('fiado')){
        fiado.classList.remove('fiado')
        gasto.classList.toggle('gasto')
    }else{
       gasto.classList.toggle('gasto')
    }
    
}) 