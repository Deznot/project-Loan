import Slider from './slider';

export default class MiniSlider extends Slider{
    constructor(container, next, prev, activeClass, animate, autoplay, paused){
        super(container, next, prev, activeClass, animate, autoplay);
        this.paused = paused;
    }

    nextSlide(){
        //переключение на следующий слайд
        for(let i=1; i<this.slides.length; i++){
            //цикл для исправления бага с кнопками
            if(this.slides[i].tagName !== "BUTTON"){
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
                break;
            }else{
                this.container.appendChild(this.slides[i]);
                i--;
            }
        }
    }

    prevSlide(){
        //показ предыдущего слайда + фикс кнопок
        for(let i=this.slides.length-1; i>0; i--){
            if(this.slides[i].tagName !== "BUTTON"){
                let active = this.slides[i];
                this.container.insertBefore(active, this.slides[0]);
                this.decorizeSlides();
                break;
            }else{i--;} 
        }            
    }

    decorizeSlides(){
        //удаление activeClass и анимирование элементов слайда
        this.slides.forEach(slide=>{
            slide.classList.remove(this.activeClass);
            if(this.animate){
                slide.querySelector('.card__title').style.opacity = '.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);
        if(this.animate){
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers(){
        this.next.forEach(item=>{
            item.addEventListener('click',()=>this.nextSlide());
        });
        
        this.prev.forEach(item =>{
            item.addEventListener('click',()=>this.prevSlide());
        });
    }   

    activeAutoplay(){
        this.paused = setInterval(()=>{
            this.nextSlide();
        },2000);
    }

    init(){
        try{
            this.container.style.cssText =`
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorizeSlides();

            if(this.autoplay){
                this.activeAutoplay();
                this.container.addEventListener('mouseenter', ()=>clearInterval(this.paused));
                this.container.addEventListener('mouseleave',  ()=>this.activeAutoplay());
            }

        }catch(e){}
       

    }
}