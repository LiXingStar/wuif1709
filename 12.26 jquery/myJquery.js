function $(selector) {
    return new aa(selector);
}

function aa(selector) {
    if (typeof selector == 'string') {
        if(/^[a-z][a-z1-6]{0,10}$/.test(selector)) {
            let elements = document.getElementsByTagName(selector);
            for (let i = 0; i < elements.length; i++) {
                this[i] = elements[i];
            }
            this.length = elements.length;
        }else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selector)){
            let divs = document.createElement(selector.slice(1,-1))  ;
            this[0] = divs;
            this.length = 1;
        }
    } else if (typeof selector == 'function') {
        window.addEventListener('load', selector, false);
    } else if (typeof selector == 'object' && selector.nodeType == 1) {
        this[0] = selector;
        this.length = 1;
    }
}

aa.prototype = {
    each: function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(i, this[i])
        }
    },
    html: function (value) {
        this.each(function (index, obj) {
            obj.innerHTML +=  value;
        });
        return this;
    },
    css: function (attrObj) {
        this.each(function (index, obj) {
            for (let i in attrObj) {
                obj.style[i] = attrObj[i];
            }
        });
        return this;
    },
    click: function (fn) {
        this.each(function (index, obj) {
            obj.addEventListener('click', fn, false)
        });
        return this;
    },
    addClass: function (classname) {
        this.each(function (index, obj) {
            obj.classList.add(classname);
        });
        return this;
    },
    removeClass: function (classname) {
        this.each(function (index, obj) {
            obj.classList.remove(classname);
        });
        return this;
    },
    attr: function (key, value) {
        if (arguments.length == 1) {
           return this[0].getAttribute(key);
        } else if (arguments.length == 2) {
            this.each(function (index, obj) {
                obj.setAttribute(key, value);
            });
            return this;
        }

    },
    appendTo:function(select) {
        let elements = document.querySelectorAll(select);
        elements.forEach(ele=>{
            let node = this[0].cloneNode(true);
            ele.appendChild(node);
        })
        return this;
        /*elements.forEach(function(ele,i){
            console.log(this);
        },this)*/
    },
    append:function(str){
        for(let i=0;i<this.length;i++){
            let element = document.createElement(str.slice(1,-1));
            this[i].appendChild(element);
        }
        return this;
    },
    width:function(){
       return  getComputedStyle(this[0],null).width;
    },
    offsetWidth:function(){
        return  this[0].offsetWidth;
    }

};