const headerResize = width => {
    headerValues.forEach(val => {
        if(val[0]>width&&val[1]<width){
            header.textContent = val[2];
            return;
        };
    });
};

const textResize = width => {
    rootValues.forEach(val => {
        if(val[0]>width&&val[1]<width){
            root.setProperty('--titleSize', val[2]+"px");
            root.setProperty('--textSize', (val[2]-4)+"px");
            root.setProperty('--NtitleSize', val[2]+"px");
            root.setProperty('--NtextSize', (val[2]-4)+"px");
            return;
        };
    });
};

const navbarResize = width => {
    navbarValues.forEach(val => {
        if(val[0]>width&&val[1]<width){
            root.setProperty('--NtitleSize', val[2]+"px");
            root.setProperty('--NtextSize', val[2]+"px");
            return;
        };
    });
};

const navbarTextResize = width => {
    navbarText.forEach(val => {
        if(val[0]>width&&val[1]<width){
            if(val[2]!='*'){
                root.setProperty('--NtitleSize', Number(root.getPropertyValue('--titleSize').replace('px', ''))-2)+'px';
                root.setProperty('--NtextSize', Number(root.getPropertyValue('--textSize').replace('px', ''))-4)+'px';
            }
            return;
        };
    });
};

const header = document.getElementById('header');
const headerValues = [[10000, 800, 'DHCP - Dynamic Host Configuration Protocol'], [800, 630, 'DHCP - Dynamic Host Configuration'], [630, 390, 'DHCP - Dynamic Host'], [390, 0, 'DHCP']]
const root = document.documentElement.style;
const rootValues = [[10000, 1350, 32], [1350, 1250, 30], [1250, 1000, 28], [1000, 750, 24], [750, 650, 20], [650, 0, 16]];
const navbarValues = [[400, 240, 10], [240, 185, 8], [185, 0, 6]];
const navbarText = [[10000, 1535, '*'], [1535, 1350], [1350, 1320, '*'], [1320, 1240], [1240, 1040, '*'], [1040, 1000], [1010, 0, '*']]
const resizeEvents = [headerResize, textResize, navbarResize, navbarTextResize];

window.addEventListener('resize', e => {
    let width = document.documentElement.clientWidth;
    for(let i=0;i<resizeEvents.length;i++){
        resizeEvents[i](width);
    };
});

document.querySelectorAll('.point').forEach(selector => {
    selector.textContent = "☉ "+selector.innerHTML;
});
const search = document.getElementById('navbar-input');
const Search = () => {
    if(search.value===''){
        return;
    };
    let isAlready = false;
    arr.forEach(value => {
        if(value[0].match(search.value)&&!isAlready){
            let rand = Math.random()*10;
            AddSpan(rand, 10, value[1], search.value);
            isAlready=true;
            return;
        };
    });
};
const spans = [];
const AddSpan = (id, num, parent, text) => {
    let isAlready = false;
    spans.forEach(span => {
        if(span[0]==id||(span[2]==parent&&span[3].match(text))) isAlready=true;
    });
    if(!isAlready){
        spans[spans.length] = [id,num,parent,text];
        let doc = document.getElementById(parent);
        doc.innerHTML = doc.innerHTML.replace(text, `<span id="x${id}" class="span-selected">${text}</span>`);
        document.getElementById('x'+id).scrollIntoView(true);
    }
};
const arr = [];
const GoTo = (id,text) => {
    if(text.match('Etap ')){
        search.value=text.substring(0,20);
        let doc = document.getElementById(id)
        doc.getElementsByClassName('section-wrapper')[0].style.display='block';
        Search();
        search.value='';
        if(id=='c'){
            setTimeout(()=>{
                doc.getElementsByClassName('title')[0].addEventListener('click',e=>{
                    let elem = doc.getElementsByClassName('section-wrapper')
                    elem[0].style.display=elem[0].style.display=='none'?'block':'none';
                });
            }, 1000);
        };
        return;
    };
    let doc = document.getElementById(id)
    doc.getElementsByClassName('section-wrapper')[0].style.display='block';
    doc.scrollIntoView(true);
};
const Navbar = () => {
    let doc = document.getElementById('navbar-title');
    doc.parentNode.style.display=doc.parentNode.style.display=='none'?'block':'none';
    console.log(doc.parentNode.style.display)
    if(doc.parentNode.style.display=='none'){
        $('#navbar-replace').show();
    } else {
        $('#navbar-replace').hide();
    };
}
let retval = "";
document.querySelectorAll('.section').forEach(section => {
    retval=retval+`<div class="section" id=${section.id}>${section.innerHTML}</div><div class="section-break">PlaceHolder</div>`;
    arr[arr.length]=[section.innerHTML, section.id];
});
document.querySelectorAll('.title').forEach(title => {
    let par = title.parentNode.id;
    if(title.parentNode.id==''){
        par='c';
    };
    $('#navbar').append(`<div class="navbar-text" onclick="GoTo('${par}','${title.textContent}')">☉${title.textContent}</div>`);
});
document.getElementById('incontainer').innerHTML=retval
document.querySelectorAll('.section').forEach(section => {
    section.getElementsByClassName('title')[0].addEventListener('click',e=>{
        let elem = section.getElementsByClassName('section-wrapper')
        elem[0].style.display=elem[0].style.display=='none'?'block':'none';
    });
});
let i=0;
let width = document.documentElement.clientWidth;
for(i=0;i<resizeEvents.length;i++){
    resizeEvents[i](width);
};

//Left For GC
i=undefined;
width = undefined;
retval = undefined;

//Same as setInterval

const spanTimeout = () => {
    let i=0;
    for(i;i<spans.length;i++){
        let span = spans[i];
        span[1]=span[1]-1
        document.getElementById('x'+span[0]).style.opacity = span[1]/10;
        if(span[1]<=0) {
            let doc = document.getElementById(span[2])
            doc.innerHTML = doc.innerHTML.replace(`<span id="x${span[0]}" class="span-selected" style="opacity: 0;">${span[3]}</span>`, span[3])
            spans.splice(i,1)
        };
    };
    setTimeout(spanTimeout, 100);
};

setTimeout(spanTimeout, 100);