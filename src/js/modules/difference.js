export default class Difference{
    constructor(oldOfficer,newOfficer, items){
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer =  document.querySelector(newOfficer);
        try{
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
        }catch(e){}
        this.oldCounter = 0;
        this.newCounter = 0;

    }

    bindTriggers(container,counter,items){
        container.querySelector('.plus').addEventListener('click',()=>{
            //т.к. необходимо удалять последний элемент, когда появляется предпоследний, используется условие ниже
            if(counter !== items.length - 2){
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated','fadeIn');
                counter++;
            }else{
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated','fadeIn');
                items[items.length-1].remove();
            }
        });
    }

    hideItems(items){
        //в кол бэк передаем 3 аргумента, для того что бы оставить последний элемент на странице
        //item - сам элемент, i- номер элемента, arr - ссылка на сам массив
        items.forEach((item,i,arr)=>{
            if(i !== arr.length-1){
                item.style.display = 'none';
            }
        });
    }

    init(){
        try{
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldOfficer,this.oldCounter,this.oldItems);
            this.bindTriggers(this.newOfficer,this.newCounter,this.newItems);
        }catch(e){}
    }

}
