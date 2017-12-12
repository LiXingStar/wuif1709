// 通过构造函数来创建子元素的获取方法children
let box = document.querySelector('.box');
// console.log(box);
function children(){
    let arr = [];
    let childnodes = box.childNodes;
    // 方法一:forEach
    childnodes.forEach(function(ele){
        if(ele.nodeType == 1){
            arr.push(ele);
        }
    })
    return arr;
    // 方法二:for循环
    for(let i = 0;i < childnodes.length;i++){
        if(childnodes[i].nodeType == 1){
            arr.push(childnodes[i]);
        }
    }
    return arr;
    // 方法三：继承的方式
    arr = Array.prototype.filter.call(childnodes,function(ele){
        return ele.nodeType == 1;
    })
    return arr
}
console.log(children());

/*创造一个函数$('')获取指定的元素,不需要再写document.getElementClassname等来获取。
$('.类名')    $('#id')    $('标签名')*/
/* 获取首字符，通过charAt获取。
    分类  #    id
          .    class
          tag  tagname
 */
function $(str){
    if(typeof str == 'string'){
        let str1 = str.trim();
        let firstchar = str1.charAt(0); /* 获取str1的首字符 */
        if(firstchar == '#'){
            return document.getElementById(str1.substring(1));
        }else if(firstchar == '.'){
            return document.getElementsByClassName(str1.substring(1));
        }else if(/^[a-zA-Z][A-Za-z1-6]{0,6}$/.test(str1)){
            return document.getElementsByTagName(str1);
        }else if(/^<[a-zA-Z][A-Za-z1-6]{0,6}>$/.test(str1)){
            return document.createElement(str1.slice(1,-1));
        }
    }else if(typeof str == 'function') {
        window.onload = function () {
            str();
        }
    }
}
let aa = $('.box');
console.log(aa);
let bb = $('#con');
console.log(bb);
let cc = $('div');
console.log(cc)

$(function () {
    let box = $('.box');
    let dd = $('<p>');
    dd.innerText = 'hello,world';
    box[0].appendChild(dd);
})

// append
function append(parentNode,child) {
    parentNode.appendChild(child);
}
/*
prepend()在某一个元素的  最前面  插入一个元素 =>第一个子元素（元素节点）
*/
function prepend(parentNode,child){
    let firstChild = parentNode.firstElementChild;
    if(firstChild){
        parentNode.insertBefore(child,firstChild)
    }else{
        parentNode.appendChild(child)
    }
}

HTMLElement.prototype.append = function (child) {
    this.appendChild(child)
};
HTMLElement.prototype.prepend = function (child) {
    let firstChild = this.firstElementChild;
    if(firstChild){
        this.insertBefore(child,firstChild)
    }else{
        this.appendChild(child)
    }
}
$(function () {
    let box = $('.box');
    let dd = $('<p>');
    dd.innerText = 'hello,world';
    box[0].appendChild(dd);
    box[0].append(dd);
    box[0].prepend(dd);
})
