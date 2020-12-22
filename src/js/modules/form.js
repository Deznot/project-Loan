export default class Form{
    constructor(){
        this.form = document.querySelectorAll('form');
        this.input = document.querySelectorAll('input');
        this.path = {
            question : "assets/question.php",
        };
        this.message = {
            loading : "Идет загрузка ...",
            success : "Скоро с вами свяжутся",
            failure : "Произошла какая-то ошибка",
        };
    }

    clearInputs(inputs){
        // let inputs = document.querySelectorAll('input');
        inputs.forEach(input =>{
            input.value = '';
        });
    }
    
    initMask(){
            let setCursorPosition = (pos,elem) =>{
                elem.focus();
                if (elem.setSelectionRange){
                    elem.setSelectionRange(pos,pos);
                }else if(elem.createTextRange){
                    let range = elem.createTextRange();
        
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
        
                }
                
            };
        
            function createMask(event){
                let matrix = '+1 (___) ___-____',
                    i = 0,
                    def = matrix.replace(/\D/g, ''), //7
                    val = this.value.replace(/\D/g, ''); //значение введенное в  input, только цифры 
        
                if (def.length >= val.length){
                    val = def;
                }
        
                this.value = matrix.replace(/./g, function(a){
                    return /[_\d]/.test(a) && i<val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                });
        
                if (event.type == 'blur'){
                    if(this.value.length == 2){
                        this.value = '';
                    }
                }else{
                    setCursorPosition(this.value.length, this);
                }
            }
        
            let inputs = document.querySelectorAll('[name="phone"]');
        
            inputs.forEach(input => {
        
                input.addEventListener('mouseup', createMask);
                input.addEventListener('keyup', createMask, (e)=>{
                    if(e.code ==='ArrowLeft'){
                        e.preventDefault();
                    }
                });
                input.addEventListener('input', createMask);
                input.addEventListener('focus', createMask);
                input.addEventListener('blur', createMask);
            });
        }

    dataForm(form){
        form.forEach(form=>{
            let inputs = form.querySelectorAll('input');
            form.addEventListener('submit',(ev)=>{
                ev.preventDefault();
                
                let statusMessage = document.createElement('div');
                    statusMessage.style.cssText =`
                        margin-top: 15px;
                        font-size: 18px;
                        color: grey;
                    `;
                    form.parentNode.appendChild(statusMessage);
                    statusMessage.textContent = this.message.loading;

                let formData = new FormData(form);

                this.postData(this.path.question,formData)
                .then(res=>{
                    statusMessage.textContent = this.message.success;
                })
                .catch(err=>this.message.failure)
                .finally(
                    setTimeout(()=>{
                        this.clearInputs(inputs);
                        statusMessage.remove();
                    },5000)
                );
            });

        });
        
    }

    checkMailInput(selector){
        let mailInput = document.querySelectorAll(selector);

        mailInput.forEach((input)=>{
            input.addEventListener('keypress',(e)=>{
                if(e.key.match(/[а-яё]/ig)){
                    e.preventDefault();
                }
            });
        });
    }

    async postData(url,data){
            let res = await fetch(url,{
                method : 'POST',
                body : data
            });
        
            return await res.text();
    }

    init(){
        this.dataForm(this.form);
        this.checkMailInput('input[type="email"]');
        this.initMask();
    }
}