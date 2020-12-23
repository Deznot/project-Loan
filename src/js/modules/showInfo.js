export default class ShowInfo{
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
    }

    init(){
        this.btns.forEach(btn=>{
            let clone = btn.querySelector('path').cloneNode(true);
            btn.addEventListener('click',()=>{
                let sibling = btn.closest('.module__info-show').nextElementSibling;
                sibling.classList.toggle('active-content');
                btn.classList.toggle('active');
                

                if(btn.classList.contains('active')){
                    btn.querySelector('path').remove();
                    sibling.style.maxHeight = sibling.scrollHeight +'px';
                }else{
                    btn.querySelector('svg').prepend(clone);
                    sibling.style.maxHeight = 0+'px';
                }


                // if(sibling.classList.contains('active-content')){
                //     sibling.style.maxHeight = sibling.scrollHeight +'px';
                // }else{
                //     sibling.style.maxHeight = 0+'px';
                // }
            });
        });
    }
}