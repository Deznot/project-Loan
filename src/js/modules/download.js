export default class Download{
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/main_dark.jpg';
    }

    downloadFile(path){
        let elem = document.createElement('a');
            elem.setAttribute('href', path);
            elem.setAttribute('download','picture');
            elem.style.display = 'none';
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
    }
    
    init(){
        this.btns.forEach(btn=>{
            btn.addEventListener('click',(e)=>{
                e.stopPropagation();
                this.downloadFile(this.path);
            });
        });
    }

}