       const storage = {
        get(){
        return JSON.parse(localStorage.getItem("dev.finance:transactions")) || []
        }, // re-Transforma em array
    
        set(transactions){
        localStorage.setItem("dev.finance:transactions", JSON.stringify(transactions)); //transforma em string
        }
        }


        const balance ={
            all:storage.get(), //storage.get()
            add(transaction){
                balance.all.push(transaction)
            },
            remove(index){
                console.log(index)
                balance.all.splice(index,1)
                console.log(balance.all)
                App.reload();
                console.log(balance.all)
            }, //OUTRO JEITO DE REMOVER ITENS DE ARRAY
            incomes(){
                let income =0;
                balance.all.forEach(transaction => {
                    if(transaction.amount > 0){
                        income = income + transaction.amount;
                    }
                })
                return income
            },
            expenses(){
                let expenses = 0;
                balance.all.forEach(transaction => {
                if(transaction.amount < 0){
                    expenses = expenses + transaction.amount
                }
                })
                return expenses
            },
            total(){
                return this.incomes() + this.expenses();
            }
        }
        // 
        // 
        // console.log(storage.get())

        const utils = {
            formatAmount(value){
            return Number(value)
            },
            formatDate(value){
            const splitDate = value.split("-");
            let ano = splitDate[0];
            let mes = splitDate[1];
            let dia = splitDate[2];
            return `${dia}/${mes}/${ano}`

            },
           formatCurrency(value){
            let valueToString = String(value).replace(',','.'); 
            // Ou pode fazer com Regex:   let valueToString = String(value).replace(/\D/g,'discover'); basicamente ele vai trocar tudo que não é número (string) por discover
            let valueToNumber = Number(valueToString)

           let valueTest = valueToNumber.toLocaleString('pt-BR' , {style:'currency', currency: 'BRL'})
           return valueTest;
    
        }}

 

        const DOM = {
            trasactionsContainer:document.querySelector('#data-table tbody'),
        addTransaction(transaction,index){
        const tr = document.createElement('tr');
        tr.innerHTML = this.innerHTMLTransaction(transaction,index);
        tr.dataset.index = index;
        return tr;
       
        },
        innerHTMLTransaction(transaction,index){
            const CSSclass = transaction.amount > 0? "income":"expense"
            const amount = utils.formatCurrency(transaction.amount)
        const html = `
          <td class="description">${transaction.description}</td>
          <td class="${CSSclass}">${amount}</td>
          <td class="data">${transaction.date}</td>
          <td> <img src="/public/images/minus.svg" class="removeImage" onclick="balance.remove(${index})"></td>`;
          return html;
},
        updateBalance(){
         document.querySelector('#incomeDisplay').innerHTML = utils.formatCurrency(balance.incomes());
         document.querySelector('#expenseDisplay').innerHTML = utils.formatCurrency(balance.expenses());
         document.querySelector('#totalDisplay').innerHTML = utils.formatCurrency(balance.total())
       
        
   
        },
     
         clearTable(){
            $('tbody tr').remove()
        },
        closeForm(){
        $('.modal-overlay').removeClass("active")
        },
        deleteFormData(){
       form.description.value = "";
       form.amount.value = "";
       form.date.value = "";
        }
        
            }
 
        const form = {
            description:document.getElementById("description"),
            amount:document.getElementById("amount"),
            date:document.getElementById("date"),
            getValues(){ 
                   return {
                    description:(form.description.value).trim(),
                    amount:form.amount.value,
                    date:form.date.value
                   }
            },
            validateDescription(event){
                const {description,amount,date} = form.getValues();
                if(description.trim() == ""){
                    event.preventDefault();
                    const getForm = document.querySelector('form');
                     const newAdvice = document.createElement("p");
                     newAdvice.id = "newAdvice"
                     newAdvice.innerHTML = "Por favor, preencha todos os dados";
                     getForm.appendChild(newAdvice);
                 }
            },
            saveTransaction(transaction){
            balance.add(transaction)
            },
            getForm:document.querySelector('form').addEventListener('submit',function(event){
                form.getForm = event.preventDefault()
                form.validateDescription(event);
                const {description,amount,date} = form.getValues();
                let transaction = {
                    description,
                    amount:utils.formatAmount(amount),
                    date:utils.formatDate(date)
                }
                form.saveTransaction(transaction)
                App.reload();
                DOM.closeForm();
                DOM.deleteFormData();
            }) 
             
        }
         
     

        const App = {
        init(){
            balance.all.forEach(function(transaction,index){
                // let index = balance.all.length
                // console.log(index)
                DOM.trasactionsContainer.appendChild(DOM.addTransaction(transaction,index))
              
            })
            DOM.updateBalance();
            
            storage.set(balance.all)
        },
        reload(){
           DOM.clearTable();
            // Ou então pode usar DOM.trasactionsContainer.innerHTML = '';
            App.init();
        }
            }
            App.init();
         
           
       
           
            
        // ========================    JQUERY    ===========================

        
        
        $(function(){
            // OPEN & CLOSE BUTTON ======================
            $('p.button.new').on('click',function(){
                //adiciona a classe active
                $('.modal-overlay').addClass("active") //Ou usar .classList.add no js normal
            })
        
            $('#cancel').on('click',function(e){ //remove a classe ctive
                e.preventDefault() 
                $('.modal-overlay').removeClass("active") //Ou usar .classList.remove no js normal
            })

        })
     

        // =============== MÉTODOS DIFERENTES ================
        // THROW ERROR
        // if(description.trim() == "uiui"){
        //     event.preventDefault();
        //     throw new Error("ui ui")
        // }


        // try{
        //     console.log('AUSHUAAAAAA')
        // }catch(error){
        //   alert(error.message)
        // }
        